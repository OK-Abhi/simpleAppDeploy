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

router.get('/feature', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'feature.html'));
})

module.exports = router;
