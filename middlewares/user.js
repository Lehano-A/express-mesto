const Card = require('../models/card');

const User = require('../models/user');

const HandlerForbiddenError = require('../utils/handlersErrors/HandlerForbiddenError');

const HandlerBadRequestError = require('../utils/handlersErrors/HandlerBadRequestError');

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

/* ПРОВЕРКА ВЛАДЕЛЬЦА ПРОФИЛЯ НА ВЛАДЕЛЬЦА */
module.exports.checkProfileOwner = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return next(new HandlerBadRequestError('Невозможно обновить данные профиля. Такой пользователь не найден в базе данных'));
      }
      return next();
    })
    .catch(next);
};
