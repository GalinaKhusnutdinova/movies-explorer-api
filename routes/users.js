const router = require('express').Router();
const { findOnedUserMe, updateUserMe } = require('../controllers/users');
const { validationUserUpdate } = require('../middlewares/validationCelebrate');

// возвращает информацию о пользователе (email и имя) GET /users/me
router.get('/me', findOnedUserMe);

// обновляет информацию о пользователе (email и имя) PATCH /users/me
router.patch('/me', validationUserUpdate, updateUserMe);

module.exports = router;
