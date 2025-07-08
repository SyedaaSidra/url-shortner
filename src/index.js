const express = require("express");
const cors = require("cors");
const mongoConnect = require("./db");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

mongoConnect();
app.use(express.json());
const routes = require("./routes/url_route");

// For creating short URL
app.use("/api", routes);

// For redirecting short code
app.use("/", routes); // must come after /api
app.use("/api", routes);
PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
