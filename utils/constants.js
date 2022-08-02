const isURL = require('validator/lib/isURL');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const MONGO_DB_ADDRESS = 'mongodb://localhost:27017/moviesdb';
const PORT_NUMBER = 3000;

const SERVER_ERROR = 'Ошибка по умолчанию.';
const VALIDATION_ERROR_CREAT = 'Переданы некорректные данные при создание фильма.';
const CAST_ERROR = 'Переданы некорректные данные при создании пользователя.';
const NOT_FOUND_ID_DELETE = 'Передан несуществующий _id фильма.';
const FORBIDDEN_DELETE = 'Нет прав на удаление чужих фильмов';
const NOT_FOUND_USER = 'Пользователь по указанному _id не найден';
const CONFLICT_EMAIL = 'Пользователь с таким email уже существует';
const USER_UPDATE_ERROR = 'Переданы некорректные данные при обновлении профиля.';
const UNAUTHORIZED_USER = 'Не передан емейл или пароль';
const INVALID_AVTORIZATION_PARAM = 'Неправильный емейл или пароль';
const UNAUTHORIZED_ACCESS = 'Авторизуйтесь для доступа';

const urlValidator = (value, helpers) => {
  if (!isURL(value)) {
    return value;
  }
  return helpers.message('Пожалуйста, заполните действительный URL-адрес');
};

module.exports = {
  MONGO_DUPLICATE_ERROR_CODE,
  SERVER_ERROR,
  VALIDATION_ERROR_CREAT,
  CAST_ERROR,
  NOT_FOUND_ID_DELETE,
  FORBIDDEN_DELETE,
  NOT_FOUND_USER,
  CONFLICT_EMAIL,
  USER_UPDATE_ERROR,
  UNAUTHORIZED_USER,
  INVALID_AVTORIZATION_PARAM,
  MONGO_DB_ADDRESS,
  PORT_NUMBER,
  UNAUTHORIZED_ACCESS,
  urlValidator,
};
