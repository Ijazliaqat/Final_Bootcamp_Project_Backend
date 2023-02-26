const User = require("../Models/Users/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const JWT_SECRET_KEY = "OFSSecrectkey";

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

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
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email }).populate('wishlists').exec();
  } catch (err) {
    return new Error(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Invalid Email/Password" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email/Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logges In", user: existingUser, token });
};

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

module.exports = { signup, getUser, login }