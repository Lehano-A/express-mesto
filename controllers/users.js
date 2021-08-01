const User = require('../models/user'); /* МОДЕЛЬ ПОЛЬЗОВАТЕЛЯ */

const { handlerErrors } = require('../utils/errors'); /* ОБРАБОТЧИК ОШИБОК */

/* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ */
module.exports.getUsers = (req, res) => {
  User.find({})
    .select('-__v')
    .then((users) => res.send({ data: users }))
    .catch((err) => handlerErrors(err, res));
};

/* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID */
module.exports.getOneUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .select('-__v')
    .then((user) => res.send({ data: user }))
    .catch((err) => handlerErrors(err, res));
};

/* СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ */
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(
      {
        data:
        {
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        },
      },
    ))
    .catch((err) => handlerErrors(err, res));
};

/* ОБНОВЛЕНИЕ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ */
module.exports.updateProfile = (req, res) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    .then((user) => { res.send({ data: user }); })
    .catch((err) => { handlerErrors(err, res); });
};

/* ОБНОВЛЕНИЕ АВАТАРА ПОЛЬЗОВАТЕЛЯ */
module.exports.updateAvatar = (req, res) => {
  const { _id } = req.user;

  return User.findByIdAndUpdate(_id, req.body, { new: true })
    .select('-__v')
    .then((user) => { res.send({ data: user }); })
    .catch((err) => handlerErrors(err, res));
};
