const mongoose = require("mongoose");
require("dotenv").config();

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db successfully connected");
  } catch (err) {
    console.log("Oops db  connection failed", err);
    process.exit(1);
  }
};
module.exports = mongoConnect;
