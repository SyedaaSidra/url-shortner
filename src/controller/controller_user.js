const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log("Password match result:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
    };

    const token = jwt.sign(payload, "yourSecretKey", { expiresIn: "1h" });

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("req.body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  userSignIn,
  userSignUp,
};
