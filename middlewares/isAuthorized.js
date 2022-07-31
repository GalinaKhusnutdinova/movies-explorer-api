const { checkToken } = require('../utils/jwt');
const Unauthorized = require('../errors/Unauthorized'); // 401
const { UNAUTHORIZED_ACCESS } = require('../utils/constants');

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    next(new Unauthorized(UNAUTHORIZED_ACCESS));
    return;
  }

  const token = auth.replace('Bearer ', '');
  let payload;

  try {
    payload = checkToken(token);
  } catch (err) {
    next(new Unauthorized(UNAUTHORIZED_ACCESS));
  }
  req.user = { _id: payload._id };

  next();
};

module.exports = { isAuthorized };
