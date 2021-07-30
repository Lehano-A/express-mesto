const Card = require('../models/card');

const { handlerErrors } = require('../errors/errors');

const { regExp } = require('./users')

/* ПОЛУЧЕНИЕ КАРТОЧКИ */
module.exports.getCards = (req, res) => {
  console.log(regExp);
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении данных всех карточек' }));
};

/* СОЗДАНИЕ КАРТОЧКИ */
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  if (!regExp.exec(req.body.link)) {
    const err = {
      name: 'TypeError',
      message: 'Неожиданный тип значения',
    };
    return handlerErrors(err, res);
  }

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handlerErrors(err, res));
};

/* УДАЛЕНИЕ КАРТОЧКИ */
module.exports.deleteCard = (req, res) => {
  const { _id } = req.body;
  const ownerId = req.user._id;

  if (ownerId !== '61010712a1757b6b14bc5d82') { /* ФИКТИВНОЕ СРАВНЕНИЕ */
    const err = {
      name: 'Forbidden',
      message: 'No rights',
    };
    return handlerErrors(err, res);
  }

  return Card.findByIdAndRemove(_id)
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
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка во время добавления лайка' }));
};

/* УБРАТЬ ЛАЙК С КАРТОЧКИ */
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка во время удаления лайка' }));
};
