const HandlerBadRequestError = require('../utils/handlersErrors/HandlerBadRequestError'); /* ОБРАБОТЧИК ОШИБОК */
const { linkRegExp, emailRegExp } = require('../utils/constants'); /* ФУНКЦИОНАЛЬНОЕ ВЫРАЖЕНИЕ */

/* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
module.exports.checkLinkImg = (req, res, next) => {
  /* ЕСЛИ НЕТ В POST ЗАПРОСЕ ССЫЛКИ НА АВАТАРКУ ИЛИ НА ИЗОБРАЖЕНИЕ КАРТОЧКИ */
  if ((!req.body.avatar && !req.body.link) === true) { next(); return; }
  if (!linkRegExp.exec(req.body.avatar || req.body.link)) {
    next(new HandlerBadRequestError('Была передана некорректная ссылка на изображение. Проверьте правильность ввода и формат изображения: png, jpg или jpeg'));
  }
  next();
};

/* ПРОВЕРКА КОРРЕКТНОСТИ СИНТАКСИСА ВВОДИМОГО EMAIL */
module.exports.checkEmailSyntax = (req, res, next) => {
  if (!emailRegExp.exec(req.body.email)) {
    next(new HandlerBadRequestError('Email введён некорректно. Можно использовать только латинские буквы, цифры от 0 до 9, точку, дефис и нижнее подчёркивание'));
  }
  next();
};
