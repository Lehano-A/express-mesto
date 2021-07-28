const express = require('express');

const path = require('path');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
/* app.use(bodyParser.urlencoded({ extended: true })); */

/* app.use('/', require('./routes/users')); */

app.use((req, res, next) => {
  req.user = {
    _id: '61010712a1757b6b14bc5d82',
  };
  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/cards/:cardId', require('./routes/cards'));

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log('CONSOLE: ВСЁ РАБОТАЕТ');
});
