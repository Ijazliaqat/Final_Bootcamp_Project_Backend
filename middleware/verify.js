const User = require("../Models/Users/Users");
const JWT_SECRET_KEY = "OFSSecrectkey";
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  try {

    const header = req.headers["authorization"].split(" ");
    const token = header[1];
    const decode = jwt.verify(token, JWT_SECRET_KEY);
    console.log(decode)
    const user = await User.findOne({ _id: decode.id })
    console.log(user)
    req.user = user;


    next()
    // req.user = decode;
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" })
  }

};

module.exports = verifyToken;
