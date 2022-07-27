const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

// Опишем схему:
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator: {
      validate: {
        validator: (v) => isEmail(v),
        message: 'Заполните email в правльном формате',
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Ваше имя',
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
