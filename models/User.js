//userdb
//contains personal information, this database should not be visible on customer end.  An individual's information should be visible once logged in as that individual.

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema ({
  local: {
    password: {type: String, required: true},
    username: {type: String,
        required: true,
        unique: "This name is already taken, please try a different name"
    },
    points: {
      lifetime: Number,
      spent: Number 
    }
  },
    picks: [{
        date: Date,
        game: {type: Schema.Types.ObjectId, ref: "Game"},
        pick: String,
        correct: Boolean
    }],
    rewards: [{
        date: Date,
        item: String,
        cost: Number
    }]
});

//calPal has this twice with the only difference being the .local. on line 36
UserSchema.methods = {
  checkPassword: inputPassword => (bcrypt.compareSync(inputPassword, this.local.password)),
	hashPassword: plainTextPassword => (bcrypt.hashSync(plainTextPassword, 10)) 
}

UserSchema.pre('save', callback => {
  if (!this.local.password) {
    console.log('NO PASSWORD PROVIDED');
    callback();
  } else {
    this.local.password = this.hashPassword(this.local.password);
    callback();
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