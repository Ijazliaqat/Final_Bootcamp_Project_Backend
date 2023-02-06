const express = require('express');
const { signup, login, verifyToken, getUser } = require('../controllers/user-controller');
const router = express.Router();

router.post('/sign-up',signup); 
router.put('/log-in', login);
router.get('/user', verifyToken, getUser)

module.exports = router;