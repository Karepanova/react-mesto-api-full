const { isCelebrateError } = require('celebrate');
const IncorrectDataError = require('../errors/incorrect-data-err');

module.exports = ((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (isCelebrateError(err)) {
    if (!err.details.get('body')) {
      ({ statusCode, message } = new IncorrectDataError(err.details.get('params').message));
    } else {
      ({ statusCode, message } = new IncorrectDataError(err.details.get('body').message));
    }
  }
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере ошибка'
      : message,
  });
  next();
});
