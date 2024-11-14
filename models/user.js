const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  tgId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    default: '',
  },
  signed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

userSchema.plugin(uniqueValidator);
var userData = mongoose.model('users', userSchema);
module.exports = userData;