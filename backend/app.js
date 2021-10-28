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
const cors = require('cors');

// const whitelist = [
//   'https://karepanova.nomoredomains.rocks',
//   'http://karepanova.nomoredomains.rocks',
//   'localhost:3000'
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

const app = express();

app.use(cors());

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
