const User = require('../models/user'); /* МОДЕЛЬ ПОЛЬЗОВАТЕЛЯ */

const { handlerErrors } = require('../utils/errors'); /* ОБРАБОТЧИК ОШИБОК */

/* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ */
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handlerErrors(err, res));
};

/* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID */
module.exports.getOneUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error('Такой пользователь не найден в базе данных');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch(() => {
      const err = {
        name: 'CustomNotFoundUser',
        message: 'Такой пользователь не найден в базе данных',
      };
      handlerErrors(err, res);
    });
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
    .then((user) => { res.send({ data: user }); })
    .catch((err) => handlerErrors(err, res));
};
