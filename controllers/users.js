const User = require('../models/user'); /* импорт модели пользователя */

const { handlerErrors } = require('../errors/errors');

const { regExp = /(http:\/\/|https:\/\/|www\.)[0-9a-zA-Z(/\-+)]+[(.)a-z]+[(/?=%$-+-)]+[0-9a-zA-Z(/?=%$-+-)]+(\.(png|jpg|jpeg))/ } = process.env; /* ПРОВЕРКА ССЫЛКИ НА КАРТИНКУ */

/* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ */
module.exports.getUsers = (req, res) => {

  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении данных всех пользователей' }));
};

/* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID */
module.exports.getOneUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => handlerErrors(err, res));
};

/* СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ */
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body; /* ловим данные, которые передал пользователь */

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handlerErrors(err, res));
};

/* ОБНОВЛЕНИЕ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ */
module.exports.updateProfile = (req, res) => {
  const { _id } = req.body;
  User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    .then((user) => { res.send({ data: user }); })
    .catch((err) => { handlerErrors(err, res) });
};

/* ОБНОВЛЕНИЕ АВАТАРА ПОЛЬЗОВАТЕЛЯ */
module.exports.updateAvatar = (req, res) => {
  const { _id } = req.user;

  if (!regExp.exec(req.body.avatar)) {
    const err = {
      name: 'TypeError',
      message: 'Unexpected value type',
    };
    return handlerErrors(err, res);
  }

  return User.findByIdAndUpdate(_id, req.body, { new: true })
    .then((user) => { res.send({ data: user }); })
    .catch((err) => handlerErrors(err, res));
};

