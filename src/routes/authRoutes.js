// External Modules
const express = require("express");
const router = express.Router();

// Internal Modules
const {
  registerUser,
  loginUser,
} = require("../controllers/userController");

// User Routes

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;