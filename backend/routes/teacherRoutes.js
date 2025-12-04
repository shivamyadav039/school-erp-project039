const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTeachers, addTeacher, deleteTeacher } = require('../controllers/teacherController');

router.get('/', auth, getTeachers);
router.post('/', auth, addTeacher);
router.delete('/:id', auth, deleteTeacher);

module.exports = router;