const router = require('express').Router();

const { checkLinkImg } = require('../middlewares/different');
const { checkUserToken } = require('../middlewares/user');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards); /* ПОЛУЧЕНИЕ ВСЕХ КАРТОЧЕК */

/* ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ */
/* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
router.post('/', checkLinkImg, createCard);

/* УДАЛЕНИЕ КАРТОЧКИ */
/* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА */
router.delete('/:cardId', checkUserToken, deleteCard);

router.put('/:cardId/likes', likeCard); /* ДОБАВЛЕНИЕ ЛАЙКА КАРТОЧКЕ */

router.delete('/:cardId/likes', dislikeCard); /* УДАЛЕНИЕ ЛАЙКА У КАРТОЧКИ */

module.exports = router;
