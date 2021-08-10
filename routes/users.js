const router = require('express').Router();

const { checkProfileOwner } = require('../middlewares/user');

const { checkLinkImg } = require('../middlewares/different');

const {
  getUsers,
  getOneUser,
  updateProfile,
  updateAvatar,
  getMyProfile,
} = require('../controllers/users');

router.get('/', getUsers); /* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ */

router.get('/me', getMyProfile); /* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЕМ СВОЕГО ПРОФАЙЛА */

router.get('/:userId', getOneUser); /* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID */

/* ОБНОВЛЕНИЕ ПРОФИЛЯ */
/* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА, ПРОВЕРКА ДЛИНЫ ВНОСИМЫХ ОБНОВЛЕНИЙ */
router.patch('/me', checkProfileOwner, updateProfile);

/* ОБНОВЛЕНИЕ АВАТАРА */
/* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА, ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
router.patch('/me/avatar', checkProfileOwner, checkLinkImg, updateAvatar);

module.exports = router;
