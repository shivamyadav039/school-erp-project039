const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  teacherId: {
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
  subject: {
    type: String
  }
});

module.exports = mongoose.model('Teacher', TeacherSchema);