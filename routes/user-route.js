const express = require('express');
const verifyToken = require('../middleware/verify');
const { signup, login, getUser, refreshToken } = require('../controllers/user-controller');
const router = express.Router();

router.post('/sign-up',signup); 
router.put('/log-in', login);
router.get('/user', verifyToken, getUser);
// router.get('/refresh', refreshToken,verifyToken,getUser);

module.exports = router;