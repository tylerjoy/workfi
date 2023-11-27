const autoCompleteModel = require('../models/SearchAutoComplete')

module.exports = {
    getAutoComplete: (req, res) => {
      const query = req.query.query;
      console.log(req.query)
      const filteredSuggestions = autoCompleteModel.getAutocompleteSuggestions(query);
      res.json(filteredSuggestions);
  }
}