const router = require('express').Router();

const { checkLinkImg } = require('../middlewares/different');
const { checkCardOwner } = require('../middlewares/user');

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
/* ПРОВЕРКА ВЛАДЕЛЬЦА КАРТОЧКИ НА ВЛАДЕЛЬЦА */
router.delete('/:cardId', checkCardOwner, deleteCard);

router.put('/:cardId/likes', likeCard); /* ДОБАВЛЕНИЕ ЛАЙКА КАРТОЧКЕ */

router.delete('/:cardId/likes', dislikeCard); /* УДАЛЕНИЕ ЛАЙКА У КАРТОЧКИ */

module.exports = router;
