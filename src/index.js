const express = require("express");

const mongoConnect = require("./db");
require("dotenv").config();

const app = express();
mongoConnect();
app.use(express.json());
const routes = require("./routes/url_route");

// For creating short URL
app.use("/api", routes);

// For redirecting short code
app.use("/", routes); // must come after /api
app.use("/analytics", routes);
PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
