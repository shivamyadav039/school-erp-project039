const Teacher = require('../models/Teacher');

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addTeacher = async (req, res) => {
  const { teacherId, name, email, phone, subject } = req.body;
  try {
    const newTeacher = new Teacher({
      teacherId,
      name,
      email,
      phone,
      subject
    });
    const teacher = await newTeacher.save();
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Teacher removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};