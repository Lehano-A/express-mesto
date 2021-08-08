
const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const User = require('../models/user'); /* МОДЕЛЬ ПОЛЬЗОВАТЕЛЯ */

const { handlerErrors } = require('../utils/errors'); /* ОБРАБОТЧИК ОШИБОК */

const auth = require('../middlewares/auth');

const { JWT_SECRET_CODE } = process.env;


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
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => {
          res.send(
            {
              data:
              {
                _id: user._id,
                name: user.name,
                about: user.about,
                avatar: user.avatar,
              },
            },
          );
        })
        .catch((err) => { handlerErrors(err, res); });
    });
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

/* АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ */
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_CODE, { expiresIn: '7d' }); /* СОЗДАЁМ ТОКЕН */

      res.cookie('jwt', token, { /* ОТПРАВЛЯЕМ ТОКЕН В КУКИ КЛИЕНТУ */
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .end(); /* ТЕЛА ОТВЕТА НЕТ, ПОЭТОМУ ЗАВЕРШАЕМ ПРОЦЕДУРУ ФУНКЦИЕЙ end() */
    })
    .catch((err) => { console.log(err); });
};

module.exports.getMyProfile = (req, res) => {

  const { _id } = req.user;

  User.findById({ _id: _id })
    .then((user) => {
      res.send({
        data:
        {
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        },
      });
    })
    .catch((err) => { err })
}