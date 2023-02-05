const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String
})

module.exports = mongoose.model('wishlists', wishlistSchema);