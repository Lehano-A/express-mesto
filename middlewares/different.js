const { handlerErrors } = require('../utils/errors'); /* ОБРАБОТЧИК ОШИБОК */
const { regExp } = require('../utils/constants'); /* ФУНКЦИОНАЛЬНОЕ ВЫРАЖЕНИЕ */

/* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
module.exports.checkLinkImg = (req, res, next) => {
  /* ЕСЛИ НЕТ В POST ЗАПРОСЕ ССЫЛКИ НА АВАТАРКУ ИЛИ НА ИЗОБРАЖЕНИЕ КАРТОЧКИ */
  if ((!req.body.avatar && !req.body.link) === true) { next(); return; }
  if (!regExp.exec(req.body.avatar || req.body.link)) {
    const err = {
      name: 'CustomTypeError',
      message: 'Неожиданный тип значения переданной ссылки',
    };
    handlerErrors(err, res);
  }

  next();
};
