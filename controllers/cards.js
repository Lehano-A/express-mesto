const Card = require('../models/card');

const { handlerErrors } = require('../utils/errors');

/* ПОЛУЧЕНИЕ ВСЕХ КАРТОЧЕК */
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handlerErrors(err, res));
};

/* СОЗДАНИЕ КАРТОЧКИ */
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({
      data:
      {
        _id: card._id,
        name: card.name,
        link: card.link,
        owner: card.owner,
        createdAt: card.createdAt,
      },
    }))
    .catch((err) => handlerErrors(err, res));
};

/* УДАЛЕНИЕ КАРТОЧКИ */
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .select('-__v')
    .then((card) => res.send({ data: card }))
    .catch((err) => handlerErrors(err, res));
};

/* ПОСТАВИТЬ ЛАЙК КАРТОЧКЕ */
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .select('-createdAt -__v')
    .then((card) => res.send({ data: card }))
    .catch((err) => handlerErrors(err, res));
};

/* УБРАТЬ ЛАЙК С КАРТОЧКИ */
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .select('-createdAt -__v')
    .then((card) => res.send({ data: card }))
    .catch((err) => handlerErrors(err, res));
};
