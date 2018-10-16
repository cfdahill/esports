const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Game
      .find(req.query)
      .sort({date: -1})
      .then(dbModel => {
        return(res.json(dbModel));
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Game
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.state(422).json(err));
  },
  findById: function(req, res) {
    db.Game
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Game
      .findOneAndUpdate({_id: req.params.id}, {$set:req.body})
      .then(dbModel => {
        return(res.json(dbModel))
      })
      .catch(err => res.state(422).json(err));
  }
}