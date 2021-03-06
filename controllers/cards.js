const Card = require('../models/card');

const HandlerNotFoundError = require('../utils/handlersErrors/HandlerNotFoundError');

/* ПОЛУЧЕНИЕ ВСЕХ КАРТОЧЕК */
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

/* СОЗДАНИЕ КАРТОЧКИ */
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.send({
        data:
        {
          _id: card._id,
          name: card.name,
          link: card.link,
          owner: card.owner,
          createdAt: card.createdAt,
        },
      });
    })
    .catch(next);
};

/* УДАЛЕНИЕ КАРТОЧКИ */
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  /* МИДЛВЭР ПРОВЕРИЛ ВЛАДЕЛЬЦА И НАЛИЧИЕ КАРТОЧКИ */
  return Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch(next);
};

/* ПОСТАВИТЬ ЛАЙК КАРТОЧКЕ */
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .select('-createdAt')
    .then((card) => {
      if (!card) {
        return next(new HandlerNotFoundError('Такая карточка не найдена в базе данных'));
      }
      return res.send({ data: card });
    })
    .catch(next);
};

/* УБРАТЬ ЛАЙК С КАРТОЧКИ */
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .select('-createdAt')
    .then((card) => {
      if (!card) {
        return next(new HandlerNotFoundError('Такая карточка не найдена в базе данных'));
      }
      return res.send({ data: card });
    })
    .catch(next);
};
