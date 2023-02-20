const Products = require('../Models/dbProducts/dbProducts')

const postProducts = async (req, res) => {
    const dataObj = req.body
    Products.create(dataObj, (err, dataObj) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(201).json({ message: "Product created successfully", data: dataObj, errors: null });
        }
    })
}
const getProducts = async (req, res) => {
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
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = { postProducts, getProducts };