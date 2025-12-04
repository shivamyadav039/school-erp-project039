const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  class: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Student', StudentSchema);