const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: String,
    oldPrice: String,
    newPrice: String
    
});

module.exports = mongoose.model('products', productsSchema);