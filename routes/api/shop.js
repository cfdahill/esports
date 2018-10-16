const router = require("express").Router();
const shopController = require("../../controllers/shopController");

//Matches with "/api/games"
router.route("/")
  .get(shopController.findAll);

  module.exports = router;