//gamedb
//can be visible to customer

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: {type: String, required: false},
    league: {type: String, required: true},
    bestOf: {type: Number, default: 0},
    homeTeam: {type: String, required: true},
    homeScore: {type: Number, default: 0},
    awayTeam: {type: String, required: true},
    awayScore: {type: Number, default: 0},
    date: {type: Date, required: true},
    watch: [String],
    game: {type: String, required: true}
  });

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;

//Should create information that can be put into the team's schedule based on ._id