const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Shop
      .find(req.query)
      .sort({date: -1})
      .then(dbModel => {
        return(res.json(dbModel));
      })
      .catch(err => res.status(422).json(err));
  }
}