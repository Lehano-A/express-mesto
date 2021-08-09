const Card = require('../models/card');

const { handlerErrors } = require('../utils/errors'); /* ОБРАБОТЧИК ОШИБОК */

const HandlerForbiddenError = require('../utils/handlersErrors/HandlerForbiddenError');

const HandlerNotFoundError = require('../utils/handlersErrors/HandlerNotFoundError');

/* ПРОВЕРКА ВЛАДЕЛЬЦА КАРТОЧКИ НА ВЛАДЕЛЬЦА */
module.exports.checkCardOwner = (req, res, next) => {
  const { _id } = req.user; /* ПОЛУЧАЕМ _id ПОЛЬЗОВАТЕЛЯ ОТ МИДЛВЭРА auth */

  Card.findById(req.params.cardId) /* ИЩЕМ КАРТОЧКУ */
    .then((card) => { /* ЕСЛИ КАРТОЧКА НАШЛАСЬ */
      if (!card) { /* НО ВНУТРИ ЕЁ ПО КАКИМ-ТО ПРИЧИНАМ НЕ ОКАЗАЛОСЬ */
        throw next(new HandlerNotFoundError('Такой карточки не имеется'));
      }
      const owner = String(card.owner);
      /* ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ СОВПАЛ С ВЛАДЕЛЬЦЕМ */
      if (_id !== owner) { throw next(new HandlerForbiddenError('Недостаточно прав. Владельцем данной карточки является другой пользователь.')) }; /* ПРОВЕРЯЕМ ВЛАДЕЛЬЦА КАРТОЧКИ */
      next();
    })
    .catch(next);
};

/* ПРОВЕРКА ДЛИНЫ ВНОСИМЫХ ОБНОВЛЕНИЙ */
module.exports.checkUpdateDataUser = (req, res, next) => {
  const { name, about } = req.body;

  if ((name || about).length === 0) {
    const err = {
      name: 'ValidationError',
      message: 'shorter than the minimum',
    };

    return handlerErrors(err, res);
  }

  return next();
};
