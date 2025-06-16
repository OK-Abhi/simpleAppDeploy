// Core Module
const path = require("path");

// External Module
const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");

// Local Modules
const rootDir = require("./utils/pathUtil");
const mainRoutes = require("./routes/mainRoutes");
const usersRoutes = require("./routes/authRoutes");
const registrarRoutes = require("./routes/usersRoutes");
const infoRoute = require("./routes/InfoRoutes"); // ignore this for now
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

// Using those External Modules
const app = express();
env.config();

// Setting up the Port with .env
const port = process.env.PORT || 4001;

// Parsing the contents of the form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use("/", mainRoutes);
app.use("/", usersRoutes);
app.use("/login", registrarRoutes);

// Using the Path module to public the contents of the public folder
app.use(express.static(path.join(rootDir, "..", "public")));

app.use("/api/contacts", infoRoute);
// pw/generate endpoint auth

// Error Route and Error Handler
app.use(errorHandler);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "error.html"));
  // next();
});

// Server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    // https.createServer(app).listen(port)
  })
  .catch((error) => {
    console.log(`error ${error}`);
  });
