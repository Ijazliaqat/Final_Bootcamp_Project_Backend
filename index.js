const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser')
const Products = require('./dbProducts/dbProducts')
const app = express();
const connectDB = require('./db/connect');
const PORT = 9000;

app.use(express.json());

app.get('/all-products', async (req, res) => {

    try {
        const data = await Products.find();
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/addproducts', async (req,res,next)=>{
    const dbProduct = req.body

    Products.create(dbProduct, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.send(data)
        }
    })
})

const start = async () => {
    try {
        await connectDB(); 
        app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`)});
    } catch (error) {
        console.log(error);
    }
}

start();