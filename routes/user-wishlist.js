const express = require('express');
const router = express.Router();
const addProductToWishlist = require('../middleware/wishlist');
const {Wishlistadd,getWishlist,deleteWishlist} = require('../middleware/wishlist')
const verifyToken = require('../middleware/verify')

router.put('/wish-list/:productid',verifyToken, Wishlistadd)
router.put('/wish-list/delete/:productid',verifyToken, deleteWishlist)
router.get('/wishlist',verifyToken,getWishlist)

module.exports = router;