const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const autoCompleteController = require("../controllers/autocomplete");
const searchController = require("../controllers/search");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

// router.get("/jobData", ensureAuth, searchController.getJobData);



// router.post("/createSearch", searchController.createSearch);
router.get("/getJobData", searchController.getJobData);



// router.get("/:id", ensureAuth, searchController.getSearchResult);



// router.get("/:id", ensureAuth, postsController.getPost);
// router.put("/likePost/:id", postsController.likePost);
// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;