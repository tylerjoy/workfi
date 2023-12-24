//NOT CURRENTLY BEING USED
//FIXME, save the user searched to the database

const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema({
  searchJobTitle: {
    type: String,
    required: true,
  },
  searchJobId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  searchResult: [
    {
      postal_code: String,
      location_quotient: Number,
      name: String,
    },
  ],
  // searchResult:{
  //   type: Array,
  // }
});

const Search = mongoose.model("Search", SearchSchema);

module.exports = Search;
