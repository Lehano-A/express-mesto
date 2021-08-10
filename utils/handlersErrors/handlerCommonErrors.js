const errorsMessageList = {
  forModelUser: 'for model "user"',
  forModelCard: 'for model "card"',
  tooShorterLength: 'shorter than the minimum',
  tooLongerLength: 'longer than the maximum',
};

const {
  forModelUser,
  forModelCard,
  tooShorterLength,
  tooLongerLength,
} = errorsMessageList;

/* ОБРАБОТЧИК-СОСТАВИТЕЛЬ ОШИБОК ОТ MONGO */
function sendDataForError(err, code, text) {
  let { statusCode, message } = err;

  statusCode = code;
  message = text;
  return { statusCode, message };
}

/* ОШИБКИ ОТ MONGO */
module.exports.handlerMongoErrors = (err) => {
  if (err.name === 'CastError' && err.message.includes(forModelUser)) {
    return sendDataForError(err, 400, 'Такой пользователь не найден в базе данных');
  }

  if (err.name === 'CastError' && err.message.includes(forModelCard)) {
    return sendDataForError(err, 400, 'Такая карточка не найдена в базе данных');
  }

  if (err.name === 'ValidationError' && err.message.includes(tooShorterLength)) {
    return sendDataForError(err, 400, 'Минимальная длина поля составляет 2 символа');
  }

  if (err.name === 'ValidationError' && err.message.includes(tooLongerLength)) {
    return sendDataForError(err, 400, 'Максимальная длина поля составляет 30 символов');
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return sendDataForError(err, 409, 'Пользователь с таким email уже зарегистрирован');
  }

  if (err.name === 'JsonWebTokenError') {
    return sendDataForError(err, 401, 'Похоже что ваш токен некорректный. Для доступа к ресурсу необходимо авторизоваться');
  }
  return undefined;
};

/* ОБРАБОТЧИК-ОТПРАВИТЕЛЬ ОТВЕТА О ПОЯВИВШЕЙСЯ ОШИБКЕ И ОТ MONGO И ОТ HTTP */
module.exports.responseToError = (res, statusCode, message) => {
  res.status(statusCode).send({ message: statusCode === 500 ? 'Запрос не может быть выполнен. Возникла внутренняя ошибка сервера' : message });
};
