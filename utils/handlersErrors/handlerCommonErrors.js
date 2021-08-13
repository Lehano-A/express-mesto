const errorsMessageList = {
  forModelUser: 'for model "user"',
  forModelCard: 'for model "card"',
  tooShorterLength: 'shorter than the minimum',
  tooLongerLength: 'longer than the maximum',
  validatorLink: 'validation failed: link: Validator',
  validatorAvatar: 'validation failed: avatar: Validator',
  validatorEmail: 'validation failed: email: Validator',
};

const {
  forModelUser,
  forModelCard,
  tooShorterLength,
  tooLongerLength,
  validatorLink,
  validatorEmail,
  validatorAvatar,
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

  if (err.name === 'ValidationError' && (err.message.includes(validatorLink) || err.message.includes(validatorAvatar))) {
    return sendDataForError(err, 400, 'Недопустимый синтаксис. Ссылка на изображение должна начинаться с http://, https:// или ftp://, а заканчиваться на .ab, /abc, /abc# или форматами .png, .jpg или .jpeg');
  }

  if (err.name === 'ValidationError' && err.message.includes(validatorEmail)) {
    return sendDataForError(err, 400, 'Недопустимый синтаксис. Проверьте корректность вводимых данных вашей почты. Пример: example@example.org');
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
