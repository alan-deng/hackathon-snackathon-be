const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  images: { type: String },
  recipeingredientquantities: [String],
  recipeingredientparts: [String],
  recipeservings: Number,
  recipeinstructions: [String],
  cooktimeamt: String,
  cookunitoftime: String,
  preptimeamt: String,
  prepunitoftime: String,
  totalhours: String,
  totalminutes: String, //either a number, or "null" if no minutes, probably for something like "5 hours 0 minutes"
  christmas: Number,
  thanksgiving: Number,
  hannukah: Number,
  nye: Number,
  breakfast: Number,
  lunch: Number,
  dessert: Number,
  dinner: Number,
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
