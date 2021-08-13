const router = require('express').Router();

const { celebrate, Joi, Segments } = require('celebrate');

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
router.post('/', createCard);

/* УДАЛЕНИЕ КАРТОЧКИ */
/* ПРОВЕРКА ВЛАДЕЛЬЦА КАРТОЧКИ НА ВЛАДЕЛЬЦА */
router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), checkCardOwner, deleteCard);

router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard); /* ДОБАВЛЕНИЕ ЛАЙКА КАРТОЧКЕ */

router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard); /* УДАЛЕНИЕ ЛАЙКА У КАРТОЧКИ */

module.exports = router;
