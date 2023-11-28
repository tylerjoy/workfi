const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const autoCompleteController = require("../controllers/autocomplete");
const searchController = require("../controllers/search");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex, );
router.get("/autocomplete", autoCompleteController.getAutoComplete)
// router.post("/search", searchController.postJobCode)
// router.get("/searchResults", searchController.getSearchResults);
// router.get("/search?jobCode=:jobCode", searchController.getJobSearch);

// router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/profile", ensureAuth, searchController.getProfile);
// router.get("/searchProfile", ensureAuth, searchController.getsearchProfile);



router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
