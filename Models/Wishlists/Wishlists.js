const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String
})

const WishList = mongoose.model('wishlists', wishlistSchema);
module.exports = WishList;