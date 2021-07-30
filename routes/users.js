const router = require('express').Router();

const {
  getUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers); /* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ */

router.get('/:userId', getOneUser);

router.post('/', createUser); /* СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ */

router.patch('/', updateProfile); /* ОБНОВЛЕНИЕ ПРОФИЛЯ */

router.patch('/avatar', updateAvatar); /* ОБНОВЛЕНИЕ АВАТАРА */

module.exports = router;
