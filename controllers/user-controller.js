const User = require("../Models/Users/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // let existingUser;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    } else {
      const hashedPassword = bcrypt.hashSync(password);
      const data = await User.create({ name, email, password: hashedPassword });
      return res
        .status(201)
        .json({ message: "User Created Successfully", data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
  // try {

  //     existingUser = await User.findOne({ email: email })
  // } catch (err) {
  //     console.log(err);
  // }

  // if (existingUser) {
  //     res.status(400).json({ message: "User already exists" })
  // }

  // const emailExist = await User.findOne({email: email});

  // const hashedPassword = bcrypt.hashSync(password);
  // const user = new User({
  //     name: name,
  //     email: email,
  //     password: hashedPassword
  // });

  // try {
  //     await user.save();
  // } catch (err) {
  //     console.log(err);
  // }

  // return res.status(201).json({ message: user })
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User Not Found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email/Password" });
  }
  const token = jwt.sign({id: existingUser._id }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: "1h",
  });

  // res.cookie(String(existingUser._id), token, {
  //     path: '/',
  //     expires: new Date(Date.now() + 1000 * 30),
  //     httpOnly: true,
  //     sameSite: 'lax'
  // });
  return res
    .status(200)
    .json({ message: "Successfully Logges In", user: existingUser, token });
};

// const verifyToken = (req, res, next) => {
//   // const cookies = req.headers.cookie;
//   // const token = cookies.split("=")[1]
//   // // const headers = req.headers[`authorization`];
//   // // const token = headers.split(' ')[1];
//   // console.log(token);
//   // if (!token) {
//   //     res.status(404).json({ message: 'No Token Found' })
//   // }
//   // jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
//   //     if (err) {
//   //         res.status(400).json({ message: "Invalid Token" })
//   //     }
//   //     console.log(user.id);
//   //     req.id = user.id;
//   // });
//   // next();
// };

const getUser = async (req, res, next) => {
  let userId = req.id;
  // let user;

  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ message: "Users not Found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return new Error(err);
  }
};

const refreshToken = (req, res, next) => {
  // const cookies = req.headers.cookie;
  // const prevToken = cookies.split("=")[1]
  // // const cookies = req.headers[`authorization`];
  // // const prevToken = cookies.split(' ')[1];
  // if (!prevToken) {
  //     return res.status(400).json({ message: 'Couldnt find Token' })
  // }
  // jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
  //     if (err) {
  //         console.log(err);
  //         return res.status(403).json({ message: 'Auth Failed' })
  //     }
  //     res.clearCookie(`${user.id}`);
  //     req.cookies[`${user.id}`] = "";
  //     const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
  //         expiresIn: "35s"
  //     })
  //     res.cookie(String(user.id), token, {
  //         path: '/',
  //         expires: new Date(Date.now() + 1000 * 30),
  //         httpOnly: true,
  //         sameSite: 'lax'
  //     });
  //     req.id = user.id;
  //     next();
  // });
};

// exports.signup = signup;
// exports.login = login;
// // exports.verifyToken = verifyToken;
// exports.getUser = getUser;
// exports.refreshToken = refreshToken;
module.exports={
    signup,
    getUser,
    login
}
