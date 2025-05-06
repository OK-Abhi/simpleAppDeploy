// Core Module
const path = require("path");

// External Module
const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");

// Local Modules
const rootDir = require("./utils/pathUtil");
const mainRoutes = require("./routes/mainRoutes");
const contactRoute = require("./routes/InfoRoutes"); // ignore this for now

// Using those External Modules
const app = express();
env.config();

// Setting up the Port with .env
const port = process.env.PORT || 4001;

// Parsing the contents of the form
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", mainRoutes);

// Don't Touch this block of code below this comment right now please


// Using the Path module to public the contents of the public folder
app.use(express.static(path.join(rootDir, "..", "public")));


// For Testing Purpose
app.use(express.json());

app.use("/api/contacts", contactRoute);
// pw/generate endpoint auth

// Error Route
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "error.html"));
  // next();
});

// Server
app.listen(port, (error) => {
  console.log(`Listening on ${port} and error is ${error}`);
});
