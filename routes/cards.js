const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards); /* ПОЛУЧЕНИЕ ВСЕХ КАРТОЧЕК */

router.post('/', createCard); /* ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ */

router.delete('/', deleteCard); /* УДАЛЕНИЕ КАРТОЧКИ */

router.put('/:cardId/likes', likeCard); /* ДОБАВЛЕНИЕ ЛАЙКА КАРТОЧКЕ */

router.delete('/:cardId/likes', dislikeCard); /* УДАЛЕНИЕ ЛАЙКА У КАРТОЧКИ */

module.exports = router;
