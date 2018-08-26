const router = require("express").Router();
const gamesRoutes = require("./games");

// Match schedule routes
router.use("/games", gamesRoutes);

module.exports = router;
