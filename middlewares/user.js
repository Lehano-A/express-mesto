const { handlerErrors } = require('../utils/errors'); /* ОБРАБОТЧИК ОШИБОК */

/* ПРОВЕРКА ВЛАДЕЛЬЦА НА ВЛАДЕЛЬЦА */
module.exports.checkUserToken = (req, res, next) => {
  const { _id } = req.user;

  if (_id !== '61010712a1757b6b14bc5d82') {
    const err = {
      name: 'CustomNotValidToken',
      message: 'Несовпадение токенов',
    };
    return handlerErrors(err, res);
  }

  return next();
};

/* ПРОВЕРКА ДЛИНЫ ВНОСИМЫХ ОБНОВЛЕНИЙ */
module.exports.checkUpdateDataUser = (req, res, next) => {
  const { name, about } = req.body;

  if ((name || about).length === 0) {
    const err = {
      name: 'ValidationError',
      message: 'shorter than the minimum',
    };

    return handlerErrors(err, res);
  }

  return next();
};
