//gamedb
//can be visible to customer

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let TeamSchema = new Schema ({

    name: {
        type: String,
        unique: true
    },
    logo: String,
    link: String,
    schedule: [{
        type: Schema.Types.ObjectId,
        ref: "Game"
    }]
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;