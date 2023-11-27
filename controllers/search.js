const Search = require('../models/Search')
const SearchDb = require('../models/SearchDb')
const axios = require('axios');
require("dotenv").config({ path: "./config/.env" });


module.exports = {
    postJobCode: (req, res) => {
        const searchTerm = req.body.query
        // console.log(searchTerm)
        const jobCode = Search.findJobCode(searchTerm);
        // const jobSearch = Search.se
        // res.json(jobCode)
        // console.log(jobCode)
        const searchResults = Search.searchJobs(jobCode)
        console.log(searchResults)
        // res.json(jobCode)
        res.render("searchResults.ejs", { jobs: searchResults });

        // res.redirect(`/search/?jobCode=${jobCode}`)
    },
    // createSearch: (req, res) => {
    //   console.log(req.body)
      // const searchTerm = req.body.query
      // // console.log(searchTerm)
      // const jobCode = Search.findJobCode(searchTerm);
      // // const jobSearch = Search.se
      // // res.json(jobCode)
      // // console.log(jobCode)
      // const searchResults = Search.searchJobs(jobCode)
      // console.log(searchResults)
      // // res.json(jobCode)
      // res.render("searchResults.ejs", { jobs: searchResults });


    // getSearchResults: async (req, res) => {
    //   console.log(`hi from feed: ${req}`)
      // const jobs = 
      // try {
      //   res.render("searchresults.ejs");
      // } catch (err) {
      //   console.log(err);
      // }   
    // },
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
        const jobCode = await Search.findJobCode(searchTerm);
        const searchResults = await Search.searchJobs(jobCode).above_average
        console.log(searchResults)
        await SearchDb.create({
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