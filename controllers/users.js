const bcrypt = require('bcrypt');
const User = require('../models/users');
const { MONGO_DUPLICATE_ERROR_CODE } = require('../utils/constants');
const { generateToken } = require('../utils/jwt');
const ValidationError = require('../errors/ValidationError'); // 400
const Unauthorized = require('../errors/Unauthorized'); // 401
const NotFound = require('../errors/NotFound'); // 404
const Conflict = require('../errors/Conflict'); // 409
const {
  CAST_ERROR,
  NOT_FOUND_USER,
  CONFLICT_EMAIL,
  USER_UPDATE_ERROR,
  UNAUTHORIZED_USER,
  INVALID_AVTORIZATION_PARAM,
} = require('../utils/constants');

// возвращает информацию о пользователе (email и имя)
module.exports.findOnedUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFound(NOT_FOUND_USER));
        return;
      }
      res.send(user);
    })
    .catch(next);
};

// создаёт пользователя с переданными в теле email, password и name
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name,
      email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new Conflict(CONFLICT_EMAIL));
        return;
      }

      if (err.errors) { // получили все ключи
        const errorKeys = Object.keys(err.errors);
        // взяли ошибку по первому ключу, и дальше уже в ней смотреть.
        const error = err.errors[errorKeys[0]];
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          next(new ValidationError(`${CAST_ERROR}. ${error}`));
          return;
        }
      }

      next(err);
    });
};

// обновляет информацию о пользователе (email и имя)
module.exports.updateUserMe = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => next(new NotFound(NOT_FOUND_USER)))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new Conflict(CONFLICT_EMAIL));
        return;
      }
      if (err.errors) {
        // получили все ключи
        const errorKeys = Object.keys(err.errors);
        // взяли ошибку по первому ключу, и дальше уже в ней смотреть.
        const error = err.errors[errorKeys[0]];
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          next(new ValidationError(`${USER_UPDATE_ERROR} ${error}`));
          return;
        }
      }
      if (err.name === 'CastError') {
        next(new ValidationError(USER_UPDATE_ERROR));
        return;
      }
      next(err);
    });
};

// проверяет переданные в теле почту и пароль и возвращает JWT
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new Unauthorized(UNAUTHORIZED_USER));
    return;
  }

  User.findOne({ email }).select('+password')
    .then((foundUser) => {
      if (!foundUser) {
        throw new Unauthorized(INVALID_AVTORIZATION_PARAM);
      }

      return Promise.all([
        foundUser,
        bcrypt.compare(password, foundUser.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        throw new Unauthorized(INVALID_AVTORIZATION_PARAM);
      }

      return generateToken({ _id: user._id });
    })
    .then((token) => {
      res.send({ token });
    })
    .catch(next);
};
