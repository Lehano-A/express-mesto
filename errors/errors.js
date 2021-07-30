/* ТАКОГО ПОЛЬЗОВАТЕЛЯ ИЛИ КАРТОЧКИ НЕТ В БД */
const error = (numberErr, textErr, res) => res.status(numberErr).send({ message: textErr });

module.exports.handlerErrors = (err, res) => {
  if (err.name === 'CastError' && err.message.includes('for model "user"')) {
    error(404, 'Такой пользователь не найден', res);
  } else if (err.name === 'CastError' && err.message.includes('for model "card"')) {
    error(404, 'Такая карточка не найдена', res);
  } else if (err.name === 'ValidationError' && err.message.includes('shorter than the minimum')) {
    error(400, 'Минимальная длина поля составляет 2 символа', res);
  } else if (err.name === 'ValidationError' && err.message.includes('longer than the maximum')) {
    error(400, 'Максимальная длина поля составляет 30 символов', res);
  } else if (err.name === 'TypeError' && err.message.includes('Unexpected value type')) {
    error(400, 'Была передана некорректная ссылка на изображение. Проверьте правильность ввода и формат изображения: png, jpg или jpeg', res);
  } else if (err.name === 'Forbidden' && err.message.includes('No rights')) {
    error(403, 'Недостаточно прав для удаления. Ваш токен не совпадает с токеном владельца карточки', res);
  } else if (err.name === 'Forbidden' && err.message.includes('No rights')) {
    error(403, 'Недостаточно прав для удаления. Ваш токен не совпадает с токеном владельца карточки', res);
  }
};
