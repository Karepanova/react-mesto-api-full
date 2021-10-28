require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  createUser,
  login,
} = require('./controllers/users');
const {
  validateCreateUser,
  validateLogin,
} = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://karepanova.nomoredomains.rocks',
  'http://karepanova.nomoredomains.rocks',
  'localhost:3000'
];

const app = express();

app.use(function(req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});
app.use(requestLogger); // подключаем логгер запросов

// todo "Не забудьте удалить этот код после успешного прохождения ревью".
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login); // вход

app.post('/signup', validateCreateUser, createUser); // регистрация

app.use(auth); // авторизация

app.use('/users', require('./routes/users')); // все операции с пользователями (получить, удалить, изменить)

app.use('/cards', require('./routes/cards')); // все операции с карточками

app.use(() => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors); // обработчик ошибок celebrate

module.exports = app;
