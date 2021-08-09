const router = require('express').Router();

const { checkLinkImg } = require('../middlewares/different');
const { checkUserToken, checkUpdateDataUser } = require('../middlewares/user')

const {
  getUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
  getMyProfile,
} = require('../controllers/users');

router.get('/', getUsers); /* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ */

router.get('/me', getMyProfile); /* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЕМ СВОЕГО ПРОФАЙЛА */

router.get('/:userId', getOneUser); /* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID */

router.post('/', createUser);

/* ОБНОВЛЕНИЕ ПРОФИЛЯ */
/* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА, ПРОВЕРКА ДЛИНЫ ВНОСИМЫХ ОБНОВЛЕНИЙ */
router.patch('/me', checkUpdateDataUser, updateProfile);

/* ОБНОВЛЕНИЕ АВАТАРА */
/* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА, ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
router.patch('/me/avatar', checkLinkImg, updateAvatar);

module.exports = router;
