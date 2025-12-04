const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { loginUser, getMe } = require('../controllers/authController');

router.post('/login', loginUser);
router.get('/me', auth, getMe); // Add this new protected GET route

module.exports = router;