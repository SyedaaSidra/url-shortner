const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSignIn = async (req, res) => {
  // Logic for user sign-in
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }
  const existingUser = await user.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  const isMatch = await bcrypt.campare(password, existingUser.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(payload, "yourSecretKey", { expiresIn: "1h" });

  res.json({ token });
};

const userSignUp = async (req, res) => {
  const { Username, email, password } = req.body;
  if (!Username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name: Username,
    email: email,
    password: hashedPassword,
  };

  await newUser.save();
  res.status(201).json({ msg: "User registered successfully" });
};

module.exports = {
  userSignIn,
  userSignUp,
};
