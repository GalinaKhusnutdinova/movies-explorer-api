const MONGO_DUPLICATE_ERROR_CODE = 11000;
const regexUrl = /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?/;

module.exports = {
  MONGO_DUPLICATE_ERROR_CODE,
  regexUrl,
};
