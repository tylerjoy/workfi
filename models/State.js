const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  avgTwoBrMetroRent: {
    type: Number,
    required: true,
  },
  outdoorRank: {
    type: Number,
    required: true,
  },
});

StateSchema.getRentFromDb = async function getRentData(arr) {
  try {
    const resolvedValues = [];
    // Log the response for debugging
    for (const v of arr.slice(0, 5)) {
      const data = await this.findOne({ stateCode: v });
    }

    console.log(`RESPONSE FOR ${v}:=============>`, response.data);

    // Return the data from the API response
    return response.data;
  } catch (error) {
    // Handle errors, if any
    console.error(
      `Error fetching data for ${v} from the API =============>:`,
      error.message
    );

    // Return a default or placeholder value if needed
    return null;
  }
};

const State = mongoose.model("State", StateSchema);

module.exports = State;
