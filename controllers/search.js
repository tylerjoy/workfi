const Search = require("../models/Search");
const State = require("../models/State");
const searchMiddleware = require("../middleware/search");
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
  getJobData: async (req, res) => {
    try {
      const searchTerm = req.query.search;
      const jobCode = searchMiddleware.findJobCode(searchTerm);

      searchMiddleware.searchJobs(jobCode).then(async (result) => {
        let states = result;
        // console.log(states);
        const territoriesToExclude = ["AS", "PR", "VI", "GU", "MP"];
        let aboveAvgStates = result.above_average.state.filter(
          (state) => !territoriesToExclude.includes(state.postal_code)
        );

        let avgStates = result.average.state.filter(
          (state) => !territoriesToExclude.includes(state.postal_code)
        );
        let belowAvgStates = result.below_average.state.filter(
          (state) => !territoriesToExclude.includes(state.postal_code)
        );

        // console.log(territoryCheck);

        // let allStates = aboveAvgStates + avgStates + belowAvgStates;
        // allStates.forEach((state) => console.log(state));
        // console.log(JSON.stringify(allStates));

        //FIXME hosted app says result.above_average.state is undefined
        let allStatesArr = [
          aboveAvgStates.map((state) => state.postal_code),
          avgStates.map((state) => state.postal_code),
          belowAvgStates.map((state) => state.postal_code),
        ];

        let finalArr = [].concat.apply([], allStatesArr);

        console.log(finalArr);

        // let statesToRentArr;
        // console.log(statesToRentArr);

        let newTwoBrRentByState = await Promise.all(
          finalArr.map(async (elem) => {
            try {
              const state = await State.findOne({ stateCode: elem });
              if (state && state.avgTwoBrMetroRent) {
                return state.avgTwoBrMetroRent.toLocaleString("en");
              } else {
                console.log(
                  `Warning: No rental data found for stateCode${elem}`
                );
                return null;
              }
            } catch (error) {
              console.error("Error", error.message);
            }
          })
        );

        let stateOutdoorRank = await Promise.all(
          finalArr.map(async (elem) => {
            try {
              const state = await State.findOne({ stateCode: elem });
              if (state && state.outdoorRank) {
                return state.outdoorRank;
              } else {
                console.log(
                  `Warning: No outdoor recreation data found for stateCode${elem}`
                );
                return null;
              }
            } catch (error) {
              console.error("Error", error.message);
            }
          })
        );

        // console.log("NEWNEW ARRAY TO RENDER========>", newTwoBrRentByState);

        res.render("searchResult.ejs", {
          aboveAvgStates: aboveAvgStates,
          avgStates: avgStates,
          belowAvgStates: belowAvgStates,
          rentPrice: newTwoBrRentByState,
          outdoorRank: stateOutdoorRank,
          user: req.user,
          jobTitle: searchTerm,
        });
      });
    } catch (error) {
      console.error("Error", error.message);
    }
  },
  createSearch: async (req, res) => {
    const searchTerm = req.body.search;
    console.log(searchTerm);
    try {
      const searches = await Search.find({ user: req.user.id });
      const jobCode = await searchMiddleware.findJobCode(searchTerm);
      // const searchResults = await searchMiddleware.searchJobs(jobCode).above_average
      const testArr = [
        {
          postal_code: "sample postal code",
          location_quotient: 6.9,
          name: "sample name",
        },
      ];
      await Search.create({
        searchJobTitle: req.body.search,
        searchJobId: jobCode,
        user: req.user.id,
        searchResult: testArr,
      });
      console.log("Search has been added!");
      console.log(
        `Search Results: ${searchMiddleware.searchJobs(jobCode).above_average}`
      );
      // res.render("searchResult.ejs", { searchResult: searchResults, user: req.user });
      res.render("profile.ejs", { searches: searches, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
