const express = require('express');
const { postProducts, getProducts } = require('../middleware/products');
const router = express.Router();

router.post('/add-product', postProducts);
router.get('/all-products', getProducts);


module.exports = router;