const router = require("express").Router();

const gamesRoutes = require("./games");
const userRoutes = require("./users");
const shopRoutes = require("./shop");

// Match schedule routes
router.use("/games", gamesRoutes);
router.use("/users", userRoutes);
router.use("/shop", shopRoutes);

module.exports = router;
