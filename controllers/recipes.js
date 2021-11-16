const recipesRouter = require("express").Router();
const Recipe = require("../models/recipes");

// index route never exists, we dont have the functionality

// endpoint for getting a random recipe based on filters
recipesRouter.get("/random", async (req, res) => {
  try {
    const recipeArr = await Recipe.find();
    const randomArrNum = Math.floor(Math.random() * recipeArr.length);
    const recipe = recipeArr[randomArrNum];
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get recipe based on chosen filters
recipesRouter.get("/filtered", async (req, res) => {
  try {
    const recipeArr = await Recipe.find(); //   insert user inputted filters here
    const recommendRecipe = (recipes) => {
      //   insert data science people's recommendation engine here
      return recipes;
    };

    const recipe = recommendRecipe(recipeArr);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// endpoint for getting a specific recipe
recipesRouter.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// new recipe post
recipesRouter.post("/", async (req, res) => {
  try {
    const createdRecipe = await Recipe.create(req.body);
    res.status(200).json(createdRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update
recipesRouter.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// delete
recipesRouter.delete("/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = recipesRouter;
