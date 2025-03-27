const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'provide name'],
    },
    email: {
      type: String,
      required: [true, 'provide email'],
      unique: true,
    },
    password: {
      type: String,
      min: [6, 'Password must be at least 6 characters'],
      required: [true, 'provide password'],
    },
    profile_pic: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
