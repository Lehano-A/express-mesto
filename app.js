const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const { handlerErrors } = require('./utils/errors'); /* ОБРАБОТЧИК ОШИБОК */

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '61010712a1757b6b14bc5d82',
  };
  next();
});

app.use('/users', require('./routes/users')); /* ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ИЛИ СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ */

app.use('/cards', require('./routes/cards')); /* ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ */

app.use('*', (req, res) => {
  const err = {
    name: 'CustomNotFoundRoute',
    message: 'Такого маршрута не имеется',
  };
  return handlerErrors(err, res);
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
});
