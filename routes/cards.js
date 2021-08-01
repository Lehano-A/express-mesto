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

router.post('/', checkLinkImg); /* ПРОВЕРКА КОРРЕКТНОСТИ ССЫЛКИ НА ИЗОБРАЖЕНИЕ */
router.post('/', createCard); /* ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ */

router.delete('/:cardId', checkUserToken); /* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА */
router.delete('/:cardId', deleteCard); /* УДАЛЕНИЕ КАРТОЧКИ */

router.put('/:cardId/likes', likeCard); /* ДОБАВЛЕНИЕ ЛАЙКА КАРТОЧКЕ */

router.delete('/:cardId/likes', dislikeCard); /* УДАЛЕНИЕ ЛАЙКА У КАРТОЧКИ */

module.exports = router;
