require('dotenv').config();

const express = require('express');

const helmet = require('helmet');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const {
  celebrate,
  Joi,
  errors,
  Segments,
} = require('celebrate');

const cookieParser = require('cookie-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const HandlerNotFoundError = require('./utils/handlersErrors/HandlerNotFoundError');

const { auth } = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');

const { linkRegExp } = require('./utils/constants');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mesto-project-lehano.nomoredomains.club/');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login); /* АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ */

/* РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ */
/* ПРОВЕРКА УНИКАЛЬНОСТИ EMAIL, ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegExp),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), createUser);

app.use(auth); /* ПРОВЕРКА АВТОРИЗАЦИИ */

app.use('/users', require('./routes/users')); /* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ИЛИ СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ */

app.use('/cards', require('./routes/cards')); /* ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ */

app.use('*', (req, res, next) => {
  next(new HandlerNotFoundError('Такого маршрута не нашлось'));
});

app.use(express.static(__dirname));

app.use(errorLogger);

app.use(errors());

/* ЦЕНТРАЛИЗОВАННЫЙ ОБРАБОТЧИК */
// eslint-disable-next-line
app.use((err, req, res, next) => {

  const { statusCode = 500, message } = err; /* ЕСЛИ HTTP-ОШИБКА */

  return res.status(statusCode).send({ message: statusCode === 500 ? 'Запрос не может быть выполнен. Возникла внутренняя ошибка сервера' : message });
});

app.listen(PORT, () => {
});
