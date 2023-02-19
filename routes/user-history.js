const express = require('express');
const { getHistory, addHistory } = require('../middleware/history');
const router = express.Router();
const verifyToken = require('../middleware/verify');

// router.put('/history/:productid',verifyToken, addHistory);
router.put('/history',verifyToken, addHistory);
router.get('/history',verifyToken, getHistory);

module.exports = router;
