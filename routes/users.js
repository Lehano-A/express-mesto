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

router.post('/', checkLinkImg); /* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
router.post('/', createUser); /* СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ */

router.patch('/me', checkUserToken); /* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА */
router.patch('/me', checkUpdateDataUser); /* ПРОВЕРКА ДЛИНЫ ВНОСИМЫХ ОБНОВЛЕНИЙ */
router.patch('/me', updateProfile); /* ОБНОВЛЕНИЕ ПРОФИЛЯ */

router.patch('/me/avatar', checkLinkImg); /* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
router.patch('/me/avatar', updateAvatar); /* ОБНОВЛЕНИЕ АВАТАРА */

module.exports = router;
