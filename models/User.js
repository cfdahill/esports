//userdb
//contains personal information, this database should not be visible on customer end.  An individual's information should be visible once logged in as that individual.

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

mongoose.promise = Promise
const Schema = mongoose.Schema;

let UserSchema = new Schema ({
  password: {type: String, required: true},
  username: {type: String,
      required: true,
      unique: "This name is already taken, please try a different name"
  },
  points: {
    lifetime: {type: Number, default: 0},
    spent: {type: Number, default: 0} 
    }
  ,
    picks: [{
        date: Date,
        game: {type: Schema.Types.ObjectId, ref: "Game"},
        pick: String,
        correct: Number
    }],
    archivePicks: [{
      date: Date,
      game: {type: Schema.Types.ObjectId, ref: "Game"},
      pick: String,
      correct: Number
  }],
    rewards: [{
        date: Date,
        item: String,
        cost: Number
    }],
    accType: {type: String, default: "player"}

});
//calPal has this twice with the only difference being the .local. on line 36
UserSchema.methods = {
  checkPassword: function(inputPassword){
    console.log("User.js, UserSchema.checkPassword");
    console.log("inputPassword: ", inputPassword);
    console.log("this.password: ", this);
    return (bcrypt.compareSync(inputPassword, this.password));
  },
	hashPassword: plainTextPassword => (bcrypt.hashSync(plainTextPassword, 10)) 
}

UserSchema.pre('save', function(next){
  if (!this.password) {
    console.log('NO PASSWORD PROVIDED');
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;

/*What I want to happen:
Password
Username
Picks: array of objects: [{date and time of game, pick, correct}, repeat]
Points: object {lifetime total, total spent} can use these to find out current total
Rewards: array of objects: [{date purchased, item purchased, cost}] */