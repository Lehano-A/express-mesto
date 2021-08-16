const Card = require('../models/card');

const HandlerForbiddenError = require('../utils/handlersErrors/HandlerForbiddenError');

const HandlerNotFoundError = require('../utils/handlersErrors/HandlerNotFoundError');

/* ПРОВЕРКА ВЛАДЕЛЬЦА КАРТОЧКИ НА ВЛАДЕЛЬЦА */
module.exports.checkCardOwner = (req, res, next) => {
  const { _id } = req.user; /* ПОЛУЧАЕМ _id ПОЛЬЗОВАТЕЛЯ ОТ МИДЛВЭРА auth */

  Card.findById(req.params.cardId) /* ИЩЕМ КАРТОЧКУ */
    .then((card) => { /* ЕСЛИ КАРТОЧКА НАШЛАСЬ */
      if (!card) { /* НО ВНУТРИ ЕЁ ПО КАКИМ-ТО ПРИЧИНАМ НЕ ОКАЗАЛОСЬ */
        return next(new HandlerNotFoundError('Такая карточка не найдена в базе данных'));
      }
      const owner = String(card.owner);
      /* ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ СОВПАЛ С ВЛАДЕЛЬЦЕМ */
      if (_id !== owner) { return next(new HandlerForbiddenError('Недостаточно прав. Владельцем данной карточки является другой пользователь')); } /* ПРОВЕРЯЕМ ВЛАДЕЛЬЦА КАРТОЧКИ */
      return next();
    })
    .catch(next);
};
