const MONGO_DUPLICATE_ERROR_CODE = 11000;
const regexUrl = /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?/;

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

const MONGO_DB_ADDRESS = 'mongodb://localhost:27017/moviesdb';
const PORT = 3000;

module.exports = {
  MONGO_DUPLICATE_ERROR_CODE,
  regexUrl,
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
  PORT,
};
