const router = require('express').Router();

const { checkLinkImg } = require('../middlewares/different');
const { checkUserToken, checkUpdateDataUser } = require('../middlewares/user');

const {
  getUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers); /* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ */

router.get('/:userId', getOneUser); /* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID */

/* СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ */
/* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
router.post('/', checkLinkImg, createUser);

/* ОБНОВЛЕНИЕ ПРОФИЛЯ */
/* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА, ПРОВЕРКА ДЛИНЫ ВНОСИМЫХ ОБНОВЛЕНИЙ */
router.patch('/me', checkUserToken, checkUpdateDataUser, updateProfile);

/* ОБНОВЛЕНИЕ АВАТАРА */
/* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА, ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
router.patch('/me/avatar', checkUserToken, checkLinkImg, updateAvatar);

module.exports = router;
