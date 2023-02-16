const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Products = require('./Models/dbProducts/dbProducts');
const WishList = require('./Models/Wishlists/Wishlists')
const connectDB = require('./db/connect');
const Userrouter =require('./routes/user-route');
const WishListRouter = require('./routes/user-wishlist');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/verify')
const PORT = 9000;
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors({
    credentials:true,
    origin: "http://localhost:3000"
}));

app.use(cookieParser());

app.use('/authentication',Userrouter);
app.use('/user', WishListRouter);

app.get('/all-products', async (req, res) => {
    try {
        const data = await Products.find();
        res.send(data)
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

// app.post('/wish-lists', async (req, res, next) => {
//     console.log(req.body);
//     const wishListObj = req.body;

//     WishList.create(wishListObj, (err, wishListObj) => {
//         if (err) {
//             res.status(400).json({ message: err.message })
//         } else {
//             res.status(201).json({ message: "Wish List Created Successfully", data: wishListObj, errors: null })
//         }
//     })
// })

// app.post('/sign-up', (req, res) => {

//     const user = new User({
//         email: req.body.email,
//         password: req.body.password
//     });

//     user.save().then((result)=>{
//         res.status(201).json( {message: "Sign Up Created Successfully", data: result, errors: null })
//     }).catch((err)=>{
//         res.status(400).json({ message: err.message })
//     })
// })

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