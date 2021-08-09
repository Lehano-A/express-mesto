const HandlerBadRequestError = require('../utils/handlersErrors/HandlerBadRequestError'); /* ОБРАБОТЧИК ОШИБОК */
const { regExp } = require('../utils/constants'); /* ФУНКЦИОНАЛЬНОЕ ВЫРАЖЕНИЕ */

/* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
module.exports.checkLinkImg = (req, res, next) => {
  console.log(!req.body.avatar)
  /* ЕСЛИ НЕТ В POST ЗАПРОСЕ ССЫЛКИ НА АВАТАРКУ ИЛИ НА ИЗОБРАЖЕНИЕ КАРТОЧКИ */
  if ((!req.body.avatar && !req.body.link) === true) { next(); return; }
  if (!regExp.exec(req.body.avatar || req.body.link)) {
    console.log('dscdscds')
    next(new HandlerBadRequestError('Была передана некорректная ссылка на изображение. Проверьте правильность ввода и формат изображения: png, jpg или jpeg'))
  }

  next();
};
