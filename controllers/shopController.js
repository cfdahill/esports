const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    console.log('shopController: ', req.query);
    if(res) {console.log('res received');}
    db.Shop
      .find(req.query)
      .then(dbModel => {
        // console.log('shopControllwe2: ', res.json(dbModel));
        return(res.json(dbModel));
      })
      .catch(err => res.status(422).json(err));
  }
}