/* СПИСОК ОТЛАВЛИВАЕМЫХ ОШИБОК */
const error = (numberErr, textErr, res) => res.status(numberErr).send({ message: textErr });

const errorsNumberList = {
  err400: 400,
  err403: 403,
  err404: 404,
  err500: 500,
};

const errorsMessageList = {
  forModelUser: 'for model "user"',
  forModelCard: 'for model "card"',
  tooShorterLength: 'shorter than the minimum',
  tooLongerLength: 'longer than the maximum',
  unexpectedTypeLink: 'Неожиданный тип значения переданной ссылки',
  notValidToken: 'Несовпадение токенов',
  notFoundRoute: 'Такого маршрута не имеется',
  notFoundUser: 'Такой пользователь не найден в базе данных',
};

const {
  err400,
  err403,
  err404,
  err500,
} = errorsNumberList;

const {
  forModelUser,
  forModelCard,
  tooShorterLength,
  tooLongerLength,
  unexpectedTypeLink,
  notValidToken,
  notFoundRoute,
  notFoundUser,
} = errorsMessageList;

module.exports.handlerErrors = (err, res) => {
  if (err.name === 'CastError' && err.message.includes(forModelUser)) {
    error(err400, 'Такой пользователь не найден', res);
  } else if (err.name === 'CastError' && err.message.includes(forModelCard)) {
    error(err400, 'Такая карточка не найдена', res);
  } else if (err.name === 'ValidationError' && err.message.includes(tooShorterLength)) {
    error(err400, 'Минимальная длина поля составляет 2 символа', res);
  } else if (err.name === 'ValidationError' && err.message.includes(tooLongerLength)) {
    error(err400, 'Максимальная длина поля составляет 30 символов', res);
  } else if (err.name === 'CustomTypeError' && err.message.includes(unexpectedTypeLink)) {
    error(err400, 'Была передана некорректная ссылка на изображение. Проверьте правильность ввода и формат изображения: png, jpg или jpeg', res);
  } else if (err.name === 'CustomNotValidToken' && err.message.includes(notValidToken)) {
    error(err403, 'Недостаточно прав. Ваш токен не совпадает с токеном владельца', res);
  } else if (err.name === 'CustomNotFoundRoute' && err.message.includes(notFoundRoute)) {
    error(err404, 'Такого маршрута не имеется', res);
  } else if (err.name === 'CustomNotFoundUser' && err.message.includes(notFoundUser)) {
    error(err404, 'Такой пользователь не найден в базе данных', res);
  } else {
    error(err500, 'Возникла внутренняя ошибка сервера', res);
  }
};
