const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
// const authController = require("../controllers/auth");
// const homeController = require("../controllers/home");
// const autoCompleteController = require("../controllers/autocomplete");

//Search Routes

//Handle the GET request to fetch the search results
router.get("/getJobData", searchController.getJobData);

// Handle the POST request to save search results - 1
// router.post("/save-search-results", searchController.saveSearchResults);

module.exports = router;
