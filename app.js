const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

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

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
