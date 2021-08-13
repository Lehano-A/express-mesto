const router = require('express').Router();

const { celebrate, Joi, Segments } = require('celebrate');

const { linkRegExp } = require('../utils/constants');

const {
  getUsers,
  getOneUser,
  updateProfile,
  updateAvatar,
  getMyProfile,
} = require('../controllers/users');

router.get('/', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    'content-type': Joi.string(),
    'content-length': Joi.string(),
    'postman-token': Joi.string(),
    cookie: Joi.string(),
  }),
  [Segments.COOKIES]: Joi.object().keys({
    jwt: Joi.string(),
  }),
}), getUsers); /* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ */

router.get('/me', getMyProfile); /* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЕМ СВОЕГО ПРОФАЙЛА */

router.get('/:userId', getOneUser); /* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID */

/* ОБНОВЛЕНИЕ ПРОФИЛЯ */
/* ПРОВЕРКА ДЛИНЫ ВНОСИМЫХ ОБНОВЛЕНИЙ */
router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

/* ОБНОВЛЕНИЕ АВАТАРА */
/* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
router.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(linkRegExp),
  }),
}), updateAvatar);

module.exports = router;
