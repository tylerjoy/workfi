const Search = require('../models/Search')
const searchMiddleware = require('../middleware/search')
// const SearchDb = require('../models/SearchDb')
// const axios = require('axios');
require("dotenv").config({ path: "./config/.env" });


module.exports = {
    getProfile: async (req, res) => {
      try {
        const searches = await Search.find({ user: req.user.id });
        res.render("profile.ejs", { searches: searches, user: req.user });
      } catch (err) {
        console.log(err);
      }
    },  
    postJobCode: (req, res) => {
          const searchTerm = req.body.query
          // console.log(searchTerm)
          const jobCode = searchMiddleware.findJobCode(searchTerm);
          // const jobSearch = Search.se
          // res.json(jobCode)
          // console.log(jobCode)
          const searchResults = searchMiddleware.searchJobs(jobCode)
          console.log(searchResults)
          // res.json(jobCode)
          res.render("profile.ejs", { jobs: searchResults });
          // res.redirect(`/search/?jobCode=${jobCode}`)
      },
    createSearch: async (req, res) => {
      const searchTerm = req.body.search
      console.log(searchTerm)
      // const jobCode = Search.findJobCode(searchTerm);
      // const searchResults = Search.searchJobs(jobCode)
      // console.log(searchResults)
      // res.redirect('/profile')
      try {
        // Upload image to cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path);
        const jobCode = await searchMiddleware.findJobCode(searchTerm);
        const searchResults = await searchMiddleware.searchJobs(jobCode).above_average
        console.log(searchResults)
        await Search.create({
          searchJobTitle: req.body.search,
          searchJobId: jobCode,
          user: req.user.id,
        });
        console.log("Search has been added!");
        res.redirect("/profile");
      } catch (err) {
        console.log(err);
      }
    },
}