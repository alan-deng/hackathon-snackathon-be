const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [
    {
      name: String,
      amount: String, // string of quantity + measurement, or more vague measurements? in case they measure it in strange ways like "until salty enough"
    },
  ],
  description: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
