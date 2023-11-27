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
});


const searchDb = mongoose.model("Search", SearchSchema)
module.exports = searchDb