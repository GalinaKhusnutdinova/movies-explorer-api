const router = require('express').Router();
const { findMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validationCelebrate');

// # возвращает все сохранённые текущим  пользователем фильмы GET /movies
router.get('/', findMovies);

// создаёт фильм с переданными body POST /movies
router.post('/', validationCreateMovie, createMovie);

// # удаляет сохранённый фильм по id DELETE /movies/_id
router.delete('/:_id', validationDeleteMovie, deleteMovie);

module.exports = router;
