const db = require("../models");

module.exports = {
  find: function(req, res) {
    db.User
      .find({_id: req.body._id})
      .then(dbModel => {
        console.log("dbmodel:", dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => {
        console.log("dbmodel: ", dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.User 
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.state(422).json(err));
  },
  
  update: function(req, res) {
    console.log("req.body", req.body)
    db.User
      .find({_id: req.body._id}) //.elemMatch("savedEvents", req.body.itemToSave)
      .then(dbModel => {
        console.log("dbmodel", dbModel)
        console.log("dbmodel type", typeof(dbModel))
        if (dbModel.length === 0) {
          db.User
          //.update({_id: req.body._id}, {$push: {savedEvents: req.body.itemToSave}})
          .then(dbModel => res.json(req))
          .catch(err => res.json(err));       
        }
        else {
          res.json(req)
        }
      })
  }
  // remove: function(req, res) {
  //   db.User
  //     .findOneAndUpdate({_id: req.params.id}, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.state(422).json(err));
  // }
  //client side needs to create, update, and remove function for the games
}