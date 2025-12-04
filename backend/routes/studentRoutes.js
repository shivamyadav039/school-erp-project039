const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getStudents, addStudent, deleteStudent } = require('../controllers/studentController');

router.get('/', auth, getStudents);
router.post('/', auth, addStudent);
router.delete('/:id', auth, deleteStudent);

module.exports = router;