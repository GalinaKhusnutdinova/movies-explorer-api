const Movies = require('../models/movie');

const InternalServerError = require('../errors/InternalServerError'); // 500
const ValidationError = require('../errors/ValidationError'); // 400
const NotFound = require('../errors/NotFound'); // 404
const Forbidden = require('../errors/Forbidden'); // 403

// возвращает все сохранённые текущим  пользователем фильмы GET /movies
module.exports.findMovies = (req, res, next) => {
  const owner = req.user._id;
  Movies.find({ owner })
    .then((movies) => res.send(movies))
    .catch(() => next(new InternalServerError('Ошибка по умолчанию.')))
    .catch(next);
};

// создаёт фильм с переданными в теле POST /movies
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movies) => {
      res.status(201).send({
        country: movies.country,
        director: movies.director,
        duration: movies.duration,
        year: movies.year,
        description: movies.description,
        image: movies.image,
        trailer: movies.trailer,
        nameRU: movies.nameRU,
        nameEN: movies.nameEN,
        thumbnail: movies.thumbnail,
        movieId: movies.movieId,
        owner: movies.owner,
      });
    })
    .catch((err) => {
      if (err.errors) {
        // получили все ключи
        const errorKeys = Object.keys(err.errors);
        // взяли ошибку по первому ключу, и дальше уже в ней смотреть.
        const error = err.errors[errorKeys[0]];
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          next(new ValidationError(`Переданы некорректные данные при создание карточки. ${error}`));
          return;
        }
      }
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
        return;
      }

      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params._id)
    .orFail(() => next(new NotFound('Передан несуществующий _id карточки.')))
    .then((movei) => {
      const owner = movei.owner.toString();
      const userId = req.user._id.toString();

      if (userId !== owner) {
        return next(new Forbidden('Вы не можете удалять чужие каточки'));
      }
      return Movies.findByIdAndRemove(movei);
    })
    .then((movei) => res.send({ data: movei }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
        return;
      }
      next(err);
    });
};
