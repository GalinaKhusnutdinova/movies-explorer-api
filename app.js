const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    // 'https://khusnutdinova.student.nomoredomains.xyz',
    // 'https://api.khusnutdinova.student.nomoredomains.xyz',
    // 'http://khusnutdinova.student.nomoredomains.xyz',
    // 'http://api.khusnutdinova.student.nomoredomains.xyz',
    'https://GalinaKhusnutdinova.github.io',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};

app.use('*', cors(options)); // Подключаем первой миддлварой
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/moviesdb');
app.use(requestLogger); // подключаем логгер запросов
// за ним идут все обработчики роутов
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  res.status(500).send({ message: 'Что-то пошло не так' });
});

app.listen(PORT);

module.exports = app;
