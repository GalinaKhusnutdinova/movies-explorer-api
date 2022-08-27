const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

// Опишем схему:
const moviesSchema = new mongoose.Schema({
  // название фильма на русском языке
  nameRU: {
    type: String,
    default: 'https://bogatyr.club/uploads/posts/2021-11/thumbs/1636953084_1-bogatyr-club-p-glubokii-chernii-fon-1.jpg',
    required: true,
    minlength: 2,
    maxlength: 300,
  },
  // название фильма на английском языке
  nameEN: {
    type: String,
    default: 'https://bogatyr.club/uploads/posts/2021-11/thumbs/1636953084_1-bogatyr-club-p-glubokii-chernii-fon-1.jpg',
    required: true,
    minlength: 2,
    maxlength: 300,
  },

  // страна создания фильма
  country: {
    type: String,
    required: true,
    default: 'Нет',
  },
  // режиссёр фильма
  director: {
    type: String,
    required: true,
  },
  // длительность фильма
  duration: {
    type: Number,
    required: true,
  },
  // год выпуска фильма
  year: {
    type: String,
    required: true,
  },
  // описание фильма
  description: {
    type: String,
    required: true,
  },
  // ссылка на постер к фильму
  image: {
    type: String,
    required: true,
    validator: {
      validate: {
        validator: (v) => isURL(v),
        message: 'Пожалуйста, заполните действительный URL-адрес',
      },
    },
  },
  // ссылка на трейлер фильма
  trailerLink: {
    type: String,
    required: true,
    validator: {
      validate: {
        validator: (v) => isURL(v),
        message: 'Пожалуйста, заполните действительный URL-адрес',
      },
    },
  },
  // миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: true,
    validator: {
      validate: {
        validator: (v) => isURL(v),
        message: 'Пожалуйста, заполните действительный URL-адрес',
      },
    },
  },
  // _id пользователя, который сохранил фильм.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: Number,
    required: true,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('movies', moviesSchema);
