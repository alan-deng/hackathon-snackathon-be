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
recipesRouter.post("/filtered", async (req, res) => {
  try {
    // console.log(req.body);
    const filtersObj = { $and: [] };
    if (req.body.holiday) {
      filtersObj["$and"].push({ [req.body.holiday]: "1" });
    }
    if (req.body.meal) {
      filtersObj["$and"].push({ [req.body.meal]: "1" });
    }
    if (req.body.time) {
      // totalhours displays hours if minutes has time
      switch (req.body.time) {
        case "30 Minutes":
          filtersObj["$and"].push({ totalhours: "30" });
          break;
        case "1 Hour":
          filtersObj["$and"].push({ totalhours: "1" });
          filtersObj["$and"].push({ totalminutes: null });
          break;
        case "1 Hour 30 Minutes":
          filtersObj["$and"].push({ totalhours: "1" });
          filtersObj["$and"].push({ totalminutes: "30" });
          break;
        case "2 or More Hours":
          filtersObj["$and"].push({ totalhours: { $gte: 2 } });
          break;
      }
      // console.log(filtersObj);
    }
    const testFilter = {
      $and: [{ christmas: "1" }, { dinner: "1" }],
    };
    const recipeArr = await Recipe.find(filtersObj); //   insert user inputted filters here
    const recommendRecipe = (recipes) => {
      // console.log(recipeArr);
      const randomArrNum = Math.floor(Math.random() * recipes.length);
      const recipe = recipes[randomArrNum];
      return recipe;
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
