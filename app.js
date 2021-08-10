require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const cookieParser = require('cookie-parser');

const { handlerMongoErrors, responseToError } = require('./utils/handlersErrors/handlerCommonErrors');

const HandlerNotFoundError = require('./utils/handlersErrors/HandlerNotFoundError');

const { checkLinkImg, checkEmailSyntax } = require('./middlewares/different');

const { auth } = require('./middlewares/auth');

const {
  login,
  createUser,
} = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login); /* АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ */

/* РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ */
/* ПРОВЕРКА УНИКАЛЬНОСТИ EMAIL, ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
app.post('/signup', checkEmailSyntax, checkLinkImg, createUser);

app.use(auth); /* ПРОВЕРКА АВТОРИЗАЦИИ */

app.use('/users', require('./routes/users')); /* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ИЛИ СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ */

app.use('/cards', require('./routes/cards')); /* ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ */

app.use('*', (req, res, next) => {
  next(new HandlerNotFoundError('Такого маршрута не нашлось'));
});

app.use(express.static(__dirname));

/* ЦЕНТРАЛИЗОВАННЫЙ ОБРАБОТЧИК */
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const mongoError = handlerMongoErrors(err);

  if (mongoError) { /* ЕСЛИ ОШИБКА ОТ MONGO */
    const { statusCode, message } = mongoError;
    return responseToError(res, statusCode, message);
  }

  const { statusCode = 500, message } = err; /* ЕСЛИ HTTP-ОШИБКА */
  return responseToError(res, statusCode, message);
});

app.listen(PORT, () => {
});
