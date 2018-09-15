const router = require("express").Router();
const usersController = require("../../controllers/usersController");

//Matches with "/api/users"
router.route("/")
  .get(usersController.find)
  // .post(usersController.create);

//Matches with "/api/users/:id"
router
  .route("/:id")
  // .get(usersController.findById)
  .put(usersController.update)
  // .delete(usersController.remove);

module.exports = router;