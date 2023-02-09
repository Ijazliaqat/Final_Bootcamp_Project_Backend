const WishList = require('../Models/Wishlists/Wishlists');

const addProductToWishlist = async (req, res, next) => {

  console.log(req.body);
  const wishListObj = req.body;

  WishList.create(wishListObj, (err, wishListObj) => {
    if (err) {
      res.status(400).json({ message: err.message })
    } else {
      res.status(201).json({ message: "Wish List Created Successfully", data: wishListObj, errors: null })
    }
  })
};

module.exports = addProductToWishlist;