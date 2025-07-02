const express = require("express");
const mongoConnect = require("./db");
require("dotenv").config();

const app = express();
mongoConnect();

PORT = process.env.PORT;
app.use(express.json);
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
