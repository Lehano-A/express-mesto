const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { JWT_SECRET_CODE = 'AbCdEfGhI02961' } = process.env;

const HandlerNotFoundError = require('../utils/handlersErrors/HandlerNotFoundError');

const HandlerConflictError = require('../utils/handlersErrors/HandlerConflictError');

/* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ */
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

/* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID */
module.exports.getOneUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new HandlerNotFoundError('Такой пользователь не найден в базе данных'));
      }
      res.send({ data: user });
    })
    .catch(next);
};

/* СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ */
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)

    .then((hash) => {
      User.create(
        {
          name, about, avatar, email, password: hash,
        },
      )
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
        .catch((err) => {
          if (err.code === 11000) {
            next(new HandlerConflictError('Пользователь с таким email уже зарегистрирован'));
          }
          next(err);
        });
    });
};

/* ОБНОВЛЕНИЕ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ */
module.exports.updateProfile = (req, res, next) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

/* ОБНОВЛЕНИЕ АВАТАРА ПОЛЬЗОВАТЕЛЯ */
module.exports.updateAvatar = (req, res, next) => {
  const { _id } = req.user;

  return User.findByIdAndUpdate(_id, req.body, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

/* АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_CODE, { expiresIn: '7d' }); /* СОЗДАЁМ ТОКЕН */

      res.cookie('jwt', token, { /* ОТПРАВЛЯЕМ ТОКЕН В КУКИ КЛИЕНТУ */
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

/* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЕМ СВОЕГО ПРОФАЙЛА */
module.exports.getMyProfile = (req, res, next) => {
  User.findById({ _id: req.user._id }) /* ИСПОЛЬЗУЕМ _id ИЗ МИДЛВАРА auth */
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
    .catch(next);
};
