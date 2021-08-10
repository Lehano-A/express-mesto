const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const HandlerUnauthorizedError = require('../utils/handlersErrors/HandlerUnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив-Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
    select: false,
  },
}, { versionKey: false });

/* МЕТОД ПРОВЕРКИ ВАЛИДНОСТИ ПОЧТЫ И ТОКЕНА */
userSchema.static('findUserByCredentials', function checkEmailToken(email, password) {
  return this.findOne({ email }).select('+password') /* ПОИСК ПОЛЬЗОВАТЕЛЯ В БД */
    .then((user) => {
      if (!user) { /* ЕСЛИ НЕ НАШЁЛСЯ */
        return Promise.reject(new HandlerUnauthorizedError('Неправильные почта или пароль'));
      }
      /* ЕСЛИ НАШЁЛСЯ */
      return bcrypt.compare(password, user.password) /* ПРОВЕРЯЕМ ВВЕДЁННЫЙ ПАРОЛЬ С ХЕШЕМ ПАРОЛЯ */
        .then((matched) => {
          if (!matched) { /* ЕСЛИ НЕ СОВПАЛ */
            return Promise.reject(new HandlerUnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
});

module.exports = mongoose.model('user', userSchema);
