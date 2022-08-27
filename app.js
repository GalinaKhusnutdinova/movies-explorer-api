const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');
const limiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT_NUMBER } = require('./utils/constants');
const MONGO_URL = require('./utils/config');

const { PORT = PORT_NUMBER } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3001',
    'https://movies-lives.nomoredomains.xyz',
    'https://api.movies-lives.nomoredomains.xyz',
    'http://movies-lives.nomoredomains.xyz',
    'http://api.movies-lives.nomoredomains.xyz',
    'https://GalinaKhusnutdinova.github.io',
    'https://api.nomoreparties.co/',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL);
app.use(requestLogger); // подключаем логгер запросов
// за ним идут все обработчики роутов
app.use(limiter); // число запросов с одного IP в единицу времени ограничено
app.use(helmet());
app.use('*', cors(options)); // Подключаем первой миддлварой
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  res.status(500).send({ message: 'Что-то пошло не так' });
  return next();
});

app.listen(PORT);

module.exports = app;
