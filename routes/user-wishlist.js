const express = require('express');
const router = express.Router();
const addProductToWishlist = require('../middleware/wishlist');
const {Wishlistadd,getWishlist} = require('../middleware/wishlist')
const verifyToken = require('../middleware/verify')

router.put('/wish-list/:productid',verifyToken, Wishlistadd)
router.get('/wishlist',verifyToken,getWishlist)

module.exports = router;