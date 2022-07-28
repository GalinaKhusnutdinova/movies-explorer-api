const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movie');
const NotFound = require('../errors/NotFound'); // 404
const { validationLogin, validationCreateUser } = require('../middlewares/validationCelebrate');
const { createUser, login } = require('../controllers/users');
const { isAuthorized } = require('../middlewares/isAuthorized');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(isAuthorized);
router.use('/users', usersRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => next(new NotFound('Некорректный путь')));

module.exports = router;
