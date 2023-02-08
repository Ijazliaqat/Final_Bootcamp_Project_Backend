

const addProductToWishlist = async (req, res, next) => {
    // Get the current user from the request
    const user = req.user;
  console.log(user);
    // Add the new product to the user's wishlist
    // user.wishlist.push({
    //   productId: req.body.productId,
    // });
  
    // // Save the updated user
    // await user.save();
  
  };

  module.exports = addProductToWishlist;