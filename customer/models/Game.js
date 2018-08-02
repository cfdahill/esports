//gamedb
//can be visible to customer

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({

    league: {
        type: String,
        required: true
    },
    team1: {
        type: String,
        required: true
    },
    team2: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    score: [{
        team1Score: {
            type: Number,
            default: 0
        }
    }, {
        team2Score: {
            type: Number,
            default: 0
        }
    }],
    winner: String
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;

//Should create information that can be put into the team's schedule based on ._id