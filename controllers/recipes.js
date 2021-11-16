const recipesRouter = require("express").Router();
const Recipe = require("../models/recipes");

// index route never exists, we dont have the functionality

// endpoint for getting a specific recipe for show/edit pages
recipesRouter.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch {
    res.status(400).json({ error: err.message });
  }
});

// new recipe post
recipesRouter.post("/", async (req, res) => {
  res.send("create page working");
});

// update
recipesRouter.put("/:id", async (req, res) => {
  res.send("update page working");
});

// delete
recipesRouter.delete("/", async (req, res) => {
  res.send("delete page working");
});
module.exports = recipesRouter;
