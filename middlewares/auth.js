require('dotenv').config();

const jwt = require('jsonwebtoken');

const HandlerUnauthorizedError = require('../utils/handlersErrors/HandlerUnauthorizedError');

const { JWT_SECRET_CODE } = process.env;

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) { /* ЕСЛИ ТОКЕНА В ЗАПРОСЕ КЛИЕНТА НЕ НАЙДЕНО */
    return next(new HandlerUnauthorizedError('Вам необходимо авторизоваться для получения доступа к ресурсу'));
  }

  /* ЕСЛИ ТОКЕН В КУКАХ НАЙДЕН */
  const tokenFromCookie = req.cookies.jwt; /* ПРОВЕРКА ТОКЕНА ИЗ КУКИ КЛИЕНТА С ТОКЕНОМ В БД */
  let payload;
  try {
    payload = jwt.verify(tokenFromCookie, JWT_SECRET_CODE);
  } catch (err) { next(err); }

  /* ЗАПИСЫВАЕМ ОБЪЕКТ ПОЛЬЗОВАТЕЛЯ (ЕГО _id) В ОБЪЕКТ ЗАПРОСА */
  /* ЧТОБЫ ПОЛЬЗОВАТЬСЯ ЭТИМИ ДАННЫМИ ДАЛЬШЕ В МИДЛВАРАХ */
  req.user = payload;

  return next();
};
