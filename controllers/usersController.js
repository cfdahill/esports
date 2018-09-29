const db = require("../models");

module.exports = {
  find: function(req, res) {
    db.User
      .find({_id: req.body._id})
      .then(dbModel => {
        console.log("db.User.find dbmodel:", dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => {
        console.log("db.User.findById dbmodel: ", dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  // create: function(req, res) {
  //   db.User 
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.state(422).json(err));
  // },
  
  update: function(req, res) {
    console.log("-----usersController.js.update-------");
    console.log("req.body: ", req.body);
    console.log("req.body.picks: ", req.body.picks);
    // const picks = JSON.stringify(req.body.picks);
    db.User
      .findOneAndUpdate({_id: req.params.id}, {$set:{picks: req.body.picks}})
      .then(dbModel => {
        return(res.json(dbModel))
      })
      .catch(err => res.state(422).json(err));
  }
  // remove: function(req, res) {
  //   db.User
  //     .findOneAndUpdate({_id: req.params.id}, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.state(422).json(err));
  // }
  //client side needs to create, update, and remove function for the games
}