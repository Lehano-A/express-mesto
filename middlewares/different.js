const { handlerErrors } = require('../utils/errors'); /* ОБРАБОТЧИК ОШИБОК */
const { regExp } = require('../utils/constants'); /* ФУНКЦИОНАЛЬНОЕ ВЫРАЖЕНИЕ */

/* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
module.exports.checkLinkImg = (req, res, next) => {
  if (!regExp.exec(req.body.avatar || req.body.link)) {
    const err = {
      name: 'CustomTypeError',
      message: 'Неожиданный тип значения переданной ссылки',
    };
    return handlerErrors(err, res);
  }

  return next();
};
