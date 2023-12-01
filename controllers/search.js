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
    getJobData: async (req, res) => {
      try {
        const searchTerm = req.query.search
        const jobCode = searchMiddleware.findJobCode(searchTerm)
        
        searchMiddleware.searchJobs(jobCode).then(async (result) => {
          let aboveAvgStates = result.above_average.state
          //FIXME hosted app says result.above_average.state is undefined
          let statesToRentArr = aboveAvgStates.map(state => state.postal_code)
    
          let twoBrRentByState = await searchMiddleware.getRentData(statesToRentArr).then((data) => {
            const stringData = JSON.stringify(data).replaceAll('-', '_');
            const obj = JSON.parse(stringData);
    
            let twoBrRentByState = [];
    
            obj.forEach((state) => {
              let totalTwoBedroomCost = 0;
              let totalMetroAreas = 0;
    
              state.data.metroareas.forEach((metro) => {
                totalTwoBedroomCost += metro.Two_Bedroom;
                totalMetroAreas += 1;
              });
    
              const averageTwoBedroomCost = totalTwoBedroomCost / totalMetroAreas;
              twoBrRentByState.push(Math.floor(averageTwoBedroomCost));
            });
    
            return twoBrRentByState;
          });
    
          console.log('ARRAY TO RENDER========>', twoBrRentByState);
    
          res.render("searchResult.ejs", { dataFromApi: result.above_average.state, rentPrice: twoBrRentByState, user: req.user, jobTitle: searchTerm });
        });
      } catch (error) {
        console.error('Error', error.message);
      }
    },
    createSearch: async (req, res) => {
      const searchTerm = req.body.search
      console.log(searchTerm)
      try {

        const searches = await Search.find({ user: req.user.id });
        const jobCode = await searchMiddleware.findJobCode(searchTerm);
        // const searchResults = await searchMiddleware.searchJobs(jobCode).above_average
        const testArr = [
          {
            postal_code: 'sample postal code',
            location_quotient: 6.9,
            name: "sample name",
          }
        ]
        await Search.create({
          searchJobTitle: req.body.search,
          searchJobId: jobCode,
          user: req.user.id,
          searchResult: testArr,
        });
        console.log("Search has been added!");
        console.log(`Search Results: ${searchMiddleware.searchJobs(jobCode).above_average}`)
        // res.render("searchResult.ejs", { searchResult: searchResults, user: req.user });
        res.render("profile.ejs", { searches: searches, user: req.user });
      } catch (err) {
        console.log(err);
      }
    },  
}

