const express = require("express");
const router = express.Router();
const {
  shotenURl,
  redirecttoOriginal,
} = require("../controller/controller_shorten");

router.post("/shorten", shotenURl);
router.get("/:shortCode", redirecttoOriginal);
module.exports = router;
