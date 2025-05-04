const express = require('express');
const { signup, login, verifyToken } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', auth, verifyToken);

module.exports = router;
