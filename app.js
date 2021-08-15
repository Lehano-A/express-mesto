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

const HandlerNotFoundError = require('./utils/handlersErrors/HandlerNotFoundError');

const { auth } = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');

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

app.post('/signin', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    'content-type': Joi.string(),
    'content-length': Joi.string(),
    'postman-token': Joi.string(),
    cookie: Joi.string(),
  }),
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login); /* АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ */

/* РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ */
/* ПРОВЕРКА УНИКАЛЬНОСТИ EMAIL, ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
app.post('/signup', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    'content-type': Joi.string(),
    'content-length': Joi.string(),
    'postman-token': Joi.string(),
    cookie: Joi.string(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), createUser);

app.use(auth); /* ПРОВЕРКА АВТОРИЗАЦИИ */

app.use('/users', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    'content-type': Joi.string(),
    'content-length': Joi.string(),
    'postman-token': Joi.string(),
    cookie: Joi.string(),
  }),
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), require('./routes/users')); /* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ИЛИ СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ */

app.use('/cards', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    'content-type': Joi.string(),
    'content-length': Joi.string(),
    'postman-token': Joi.string(),
    cookie: Joi.string(),
  }),
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), require('./routes/cards')); /* ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ */

app.use('*', (req, res, next) => {
  next(new HandlerNotFoundError('Такого маршрута не нашлось'));
});

app.use(express.static(__dirname));

app.use(errors());

/* ЦЕНТРАЛИЗОВАННЫЙ ОБРАБОТЧИК */
// eslint-disable-next-line
app.use((err, req, res, next) => {

  const { statusCode = 500, message } = err; /* ЕСЛИ HTTP-ОШИБКА */

  return res.status(statusCode).send({ message: statusCode === 500 ? 'Запрос не может быть выполнен. Возникла внутренняя ошибка сервера' : message });
});

app.listen(PORT, () => {
});
