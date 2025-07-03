const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiredAt: { type: Date },
  lastVisted: { type: Date },
  Visited: { type: Number, default: 0 },
});
module.exports = mongoose.model("Url", schema);
