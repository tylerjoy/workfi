const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
// const authController = require("../controllers/auth");
// const homeController = require("../controllers/home");
// const autoCompleteController = require("../controllers/autocomplete");

//Search Routes
router.get("/getJobData", searchController.getJobData);


module.exports = router;