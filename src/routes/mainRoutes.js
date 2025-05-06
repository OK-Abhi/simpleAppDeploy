// Core Module
const path = require("path");

// External Module
const express = require("express");
const router = express.Router();

// Local Modules
const rootDir = require("../utils/pathUtil");

// add next() and param as well

// Serve index.html at root
router.get("/", (req, res) => {
    res.sendFile(path.join(rootDir, "views", "index.html"));
});

// Feature Route
router.get('/feature', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'feature.html'));
})

// Login Route
router.get("/login", (req, res) => {
  console.log(req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "login.html"));
});
// Signup Route
router.get("/signup", async (req, res) => {
  res.sendFile(path.join(rootDir, "views", "register.html"));
});


module.exports = router;
