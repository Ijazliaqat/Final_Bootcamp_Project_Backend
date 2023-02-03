const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    name: String,
    oldPrice: String,
    newPrice: String,
    image: String
})