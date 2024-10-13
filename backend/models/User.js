const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, 'is invalid']
  },
  lastName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, 'is invalid']
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const today = new Date();
        const age = today.getFullYear() - value.getFullYear();
        return age >= 18;
      },
      message: 'Must be 18 years or older.'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);