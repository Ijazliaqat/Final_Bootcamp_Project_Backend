const mongoose = require("mongoose");
require('dotenv').config()

// let uri = `mongodb+srv://ijaz:Mongodb009%40@bitebazaar.rwrrozp.mongodb.net/biteBazaar?retryWrites=true&w=majority`;
let uri = `mongodb+srv://ijaz:${process.env.MONGODB_PASSWORD}@bitebazaar.rwrrozp.mongodb.net/biteBazaar`
mongoose.set('strictQuery', true);
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(console.log('connted DB'))
    } catch (err) {
        console.error(err);
    }


};

module.exports = connectDB;