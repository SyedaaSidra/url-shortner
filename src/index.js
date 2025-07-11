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
app.use("/api/user", routes);

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
