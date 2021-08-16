const HandlerBadRequestError = require('../utils/handlersErrors/HandlerBadRequestError'); /* ОБРАБОТЧИК ОШИБОК */
const { emailRegExp } = require('../utils/constants'); /* ФУНКЦИОНАЛЬНОЕ ВЫРАЖЕНИЕ */

/* ПРОВЕРКА КОРРЕКТНОСТИ СИНТАКСИСА ВВОДИМОГО EMAIL */
module.exports.checkEmailSyntax = (req, res, next) => {
  if (!emailRegExp.exec(req.body.email)) {
    next(new HandlerBadRequestError('Email введён некорректно. Можно использовать только латинские буквы, цифры от 0 до 9, точку, дефис и нижнее подчёркивание'));
  }
  next();
};
