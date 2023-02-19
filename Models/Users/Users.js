const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, password: 8 },
  wishlists: [{ type: mongoose.Schema.ObjectId}],
  history: [{type: Object}]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
