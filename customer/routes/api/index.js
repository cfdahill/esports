const router = require("express").Router();

const gamesRoutes = require("./games");
const userRoutes = require("./users");

// Match schedule routes
router.use("/games", gamesRoutes);
router.use("/users", userRoutes)

module.exports = router;
