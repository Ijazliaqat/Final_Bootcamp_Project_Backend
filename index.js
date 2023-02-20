const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Products = require('./Models/dbProducts/dbProducts');
const WishList = require('./Models/Wishlists/Wishlists')
const connectDB = require('./db/connect');
const Userrouter = require('./routes/user-route');
const WishListRouter = require('./routes/user-wishlist');
const HistoryRouter = require('./routes/user-history')
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/verify')
const PORT = 9000;
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use(cookieParser());

app.use('/authentication', Userrouter);
app.use('/user', WishListRouter);
app.use('/user',HistoryRouter)

app.get('/all-products', async (req, res) => {
    const { selectCategory } = req.query;
    const filters = {};

    if (selectCategory) {
        filters.selectCategory = selectCategory;
    }
    
    try {
        if (Object.keys(filters).length === 0) {
            data = await Products.find();
            res.send(data)
        } else {

            const data = await Products.find(filters);
            res.send(data)
        }
        // res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

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

app.use('/', (req, res) => {
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