const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  name: {type: String, required: true},
  cost: {type: Number, required: true},
  img: {type: String, required: true},
  description: {type: String, required: false},
  game: {type: String, required: true}
});

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;