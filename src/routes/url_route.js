const express = require("express");
const router = express.Router();
const authorization = require("../middelware/authmiddleware");
const {
  shotenURl,
  redirecttoOriginal,
  showAnalytics,
} = require("../controller/controller_shorten");
const { userSignIn, userSignUp } = require("../controller/controller_user");
router.post("/shorten", shotenURl);
router.post("/login", userSignIn);
router.post("/register", userSignUp);
router.get("/:shortCode", authorization, redirecttoOriginal);
router.get("/analytics/:shortCode", authorization, showAnalytics);

module.exports = router;
