const express = require('express');
const router = express.Router();
const addProductToWishlist = require('../middleware/wishlist');

router.post('/wish-list', addProductToWishlist, (req, res) => {
    res.json({ message: 'Product added to wishlist successfully' });
  })

module.exports = router;