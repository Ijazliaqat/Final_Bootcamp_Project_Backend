const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser')
const Products = require('./dbProducts/dbProducts')
const app = express();
const connectDB = require('./db/connect');
const PORT = 9000;

app.use(bodyParser.json());

app.get('/all-products', async (req, res) => {

    try {
        const data = await Products.find();
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/addproducts', async (req, res, next) => {
    try {
        const { name, oldPrice, newPrice, image } = req.body
        const product = new Products({ data });
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }


    console.log({ data });

    // Products.create({ product }, (err, product) => {
    //     if (err) {
    //         res.status(400).json({ message: err.message });
    //         // res.status(500).send(err)
    //     } else {
    //         res.send(product)
    //         res.status(201).json({ message: "Product created successfully", product });
    //     }
    // })
})

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });
    } catch (error) {
        console.log(error);
    }
}

start();