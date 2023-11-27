const autoCompleteMiddleware = require('../middleware/searchAutoComplete')

module.exports = {
    getAutoComplete: (req, res) => {
      const query = req.query.query;
      console.log(req.query)
      const filteredSuggestions = autoCompleteMiddleware.getAutocompleteSuggestions(query);
      res.json(filteredSuggestions);
  }
}