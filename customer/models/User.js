//userdb
//contains personal information, this database should not be visible on customer end.  An individual's information should be visible once logged in as that individual.

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema ({

    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: "This name is already taken, please try a different name"
    },
    picks: [{
        date: Date,
        game: {
          type: Schema.Types.ObjectId,
          ref: "Game"
        },
        pick: String,
        correct: Boolean
    }],
    points: {
        lifetime: Number,
        spent: Number 
    },
    rewards: [{
        date: Date,
        item: String,
        cost: Number
    }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

/*What I want to happen:
Password
Username
Picks: array of objects: [{date and time of game, pick, correct}, repeat]
Points: object {lifetime total, total spent} can use these to find out current total
Rewards: array of objects: [{date purchased, item purchased, cost}] */