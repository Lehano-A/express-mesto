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
  notFoundCard: 'Такая карточка не найдена в базе данных',
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
  notFoundCard,
} = errorsMessageList;

function sendDataForError(err, code, text) {
  let { statusCode, message } = err;

  statusCode = code;
  message = text;
  return { statusCode, message };
}

module.exports.handlerMongoErrors = (err, res) => {
  if (err.name === 'CastError' && err.message.includes(forModelUser)) {
    return sendDataForError(err, 400, 'Такой пользователь не найден в базе данных');
  }

  if (err.name === 'CastError' && err.message.includes(forModelCard)) {
    sendDataForError(err, 400, 'Такая карточка не найдена в базе данных');
  }

  if (err.name === 'ValidationError' && err.message.includes(tooShorterLength)) {
    error(err400, 'Минимальная длина поля составляет 2 символа', res);
  }

  if (err.name === 'ValidationError' && err.message.includes(tooLongerLength)) {
    error(err400, 'Максимальная длина поля составляет 30 символов', res);
  }
  return undefined;
};


module.exports.responseToError = (res, statusCode, message) => {
  res.status(statusCode).send({ message: statusCode === 500 ? 'Запрос не может быть выполнен. Возникла внутренняя ошибка сервера.' : message });
}