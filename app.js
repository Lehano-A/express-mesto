const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

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

app.use('/users/:userId', require('./routes/users')); /* ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID */

app.use('/users/me', require('./routes/users')); /* ОБНОВЛЕНИЕ ПРОФИЛЯ + АВАТАРА */

app.use('/cards', require('./routes/cards')); /* ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ */

app.use('/cards/:cardId', require('./routes/cards')); /* УДАЛЕНИЕ КАРТОЧКИ */

app.use('/cards/:cardId/likes', require('./routes/cards')); /* ИЗМЕНЕНИЕ ЛАЙКА */

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log('CONSOLE: ВСЁ РАБОТАЕТ');
});
