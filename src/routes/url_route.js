const express = require("express");
const router = express.Router();
const {
  shotenURl,
  redirecttoOriginal,
  showAnalytics,
} = require("../controller/controller_shorten");

router.post("/shorten", shotenURl);
router.get("/:shortCode", redirecttoOriginal);
router.get("/analytics/:shortCode", showAnalytics);
module.exports = router;
