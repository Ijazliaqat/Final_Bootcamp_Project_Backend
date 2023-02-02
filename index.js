const express = require('express');
const bodyParser = require('body-parser')
const Products = require('./dbProducts/dbProducts')
const app = express();
const connectDB = require('./db/connect');
const PORT = 9000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.get('/all-products', async (req, res) => {

    try {
        const data = await Products.find();
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})
// UPPERCASE
// ADD_PRODUCT // Environment Variables / App-wide Constants example: BASE_URL
// snake_case
// add_product_to_cart // Python
// camelCase
// addProductToCart // JavaScript
// kebab-case
// add-product-to-cart // API Routes
// PascalCase
// AddProductToCart
// Title Case
// Add Product To Cart // Heading
// Sentence case
// Add product to cart // Paragraphs


app.post('/add-product', async (req, res, next) => {
    console.log(req.body);
    const dataObj = req.body
    Products.create(dataObj, (err, dataObj) => {
        if (err) {
            res.status(400).json({ message: err.message });
            // res.status(500).send(err)
        } else {
            // res.send(dataObj)
            res.status(201).json({ message: "Product created successfully", data: dataObj, errors: null });
        }
    })
})

app.use('/',(req,res)=>{
    res.send('express')
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