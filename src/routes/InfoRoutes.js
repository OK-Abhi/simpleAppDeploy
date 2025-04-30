// External Modules
const express = require("express");
const router = express.Router();

// Local Modules
const {
  getInfos,
  createLedger,
  getInfo,
  DeleteInfo,
  updateInfo,
} = require("../controllers/flureeDataController");

//@desc TEMPLATE CODE : IT WILL CHANGE LATER JUST FOR TESTING
router.route("/").get(getInfos).post(createLedger);
router.route("/:id").get(getInfo).put(updateInfo).delete(DeleteInfo);


module.exports = router;
