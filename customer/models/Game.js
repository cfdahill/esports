//gamedb
//can be visible to customer

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    league: {type: String, required: true},
    game: {type: String, required: true},
    series: {type: Number},
    homeTeam: {type: String, required: true},
    homeScore: {type: Number, default: 0},
    awayTeam: {type: String, required: true},
    awayScore: {type: Number, default: 0},
    date: {type: Date, required: true}
  });

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;

//Should create information that can be put into the team's schedule based on ._id