// Core Module
const path = require("path");

const express = require("express");
const router = express.Router();

const rootDir = require("../utils/pathUtil");

router.get("/registrars", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "registrar-dashboard.html"));
});

router.get("/students", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "student-dashboard.html"));
});

module.exports = router;
