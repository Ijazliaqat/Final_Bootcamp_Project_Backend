const User = require("../Models/Users/Users");
const JWT_SECRET_KEY = "OFSSecrectkey";
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers["authorization"].split(" ");
    const token = header[1];
    const decode = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decode.id })
    req.user = user;
    next()
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" })
  }

};

module.exports = verifyToken;
