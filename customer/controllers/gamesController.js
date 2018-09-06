const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Game
      .find(req.query)
      .sort({date: -1})
      .then(dbModel => {
        console.log(res.json(dbModel));
        return(res.json(dbModel));
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Game
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  //client side does not need any create, update, or remove function for the games
}