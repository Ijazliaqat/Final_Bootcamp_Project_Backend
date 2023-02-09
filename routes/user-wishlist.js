const express = require('express');
const router = express.Router();
const addProductToWishlist = require('../middleware/wishlist');

router.post('/wish-list', addProductToWishlist, (req, res) => {
  res.json({ message: 'Product added to wishlist successfully' });
})

router.get('/wish-list', async (req, res) => {
  try {
    const data = await Products.find();
    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router;