const mongoose = require("mongoose");
require('dotenv').config()

let uri = `mongodb+srv://ijaz:Mongodb009%40@bitebazaar.rwrrozp.mongodb.net/biteBazaar`;

mongoose.set('strictQuery', true);
const connectDB = async () => {
    try {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (err) {
        console.error(err);
    }

    
};

module.exports = connectDB;