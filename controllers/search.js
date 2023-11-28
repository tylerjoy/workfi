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
      try{
        const searchTerm = req.query.search
        const jobCode =  searchMiddleware.findJobCode(searchTerm)
        // const searchResults = searchMiddleware.searchJobs(jobCode).above_average
        searchMiddleware.searchJobs(jobCode)
          .then(result=> {
            console.log('search result======>:', (result))
            console.log('above average only search result======>:', (result.above_average))
          
            res.render("searchResult.ejs", { searchResult: result.above_average.state , user: req.user  });
          })
      } catch(error) {
        console.error('Error', error.message)
      }
          
            

          // res.render("profile.ejs")
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
        const searches = await Search.find({ user: req.user.id });
        const jobCode = await searchMiddleware.findJobCode(searchTerm);
        const searchResults = await searchMiddleware.searchJobs(jobCode).above_average
        const testArr = [
          {
            postal_code: 'sample postal code',
            location_quotient: 6.9,
            name: "sample name",
          }
        ]

        // jsResults = JSON.stringify(searchResults)
        // console.log(res)
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
    // getSearchResult: async (req, res) => {
    //   try {
    //     const searchResult = await Search.find().findById(req.params.id);
    //     res.render("searchResult.ejs", { searchResult: searchResult, user: req.user });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
}

// getPost: async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.render("post.ejs", { post: post, user: req.user });
//   } catch (err) {
//     console.log(err);
//   }
// },

// module.exports = {
//   // getProfile: async (req, res) => {
//   //   try {
//   //     const posts = await Post.find({ user: req.user.id });
//   //     res.render("profile.ejs", { posts: posts, user: req.user });
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // },
//   getFeed: async (req, res) => {
//     try {
//       const posts = await Post.find().sort({ createdAt: "desc" }).lean();
//       res.render("feed.ejs", { posts: posts });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   getPost: async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       res.render("post.ejs", { post: post, user: req.user });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   createPost: async (req, res) => {
//     try {
//       // Upload image to cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);

//       await Post.create({
//         title: req.body.title,
//         image: result.secure_url,
//         cloudinaryId: result.public_id,
//         caption: req.body.caption,
//         likes: 0,
//         user: req.user.id,
//       });
//       console.log("Post has been added!");
//       res.redirect("/profile");
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   likePost: async (req, res) => {
//     try {
//       await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/post/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   deletePost: async (req, res) => {
//     try {
//       // Find post by id
//       let post = await Post.findById({ _id: req.params.id });
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(post.cloudinaryId);
//       // Delete post from db
//       await Post.remove({ _id: req.params.id });
//       console.log("Deleted Post");
//       res.redirect("/profile");
//     } catch (err) {
//       res.redirect("/profile");
//     }
//   },
// };
