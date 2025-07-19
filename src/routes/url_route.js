const express = require("express");
const router = express.Router();
const authorization = require("../middelware/authmiddleware");
const {
  shotenURl,
  redirecttoOriginal,
  showAnalytics,
} = require("../controller/controller_shorten");
const { userSignIn, userSignUp } = require("../controller/controller_user");
router.post("/shorten", authorization, shotenURl);
router.post("/login", userSignIn);
router.post("/register", userSignUp);
router.get("/analytics/:shortCode", authorization, showAnalytics);
router.get("/:shortCode", redirecttoOriginal);
module.exports = router;
