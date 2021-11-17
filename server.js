require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 9000;
const mongodbURI =
  process.env.MONGODBURI || "mongodb://localhost:27017/hackathon-snackathon";
const methodOverride = require("method-override");
const session = require("express-session");
const mongoose = require("mongoose");
const recipesRouter = require("./controllers/recipes");
const Recipe = require("./models/recipes");

//===============Middleware===================
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
});

const whiteList = [];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) != -1 || 1 === 1) {
      //REMOVE 1==1 after done testing!
      callback(null, true);
    }
  },
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // expires in 1 day. 1000ms/sec * 60sec/min * 60 min/hr * 24 hr/day
    },
  })
);

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
//   static files in public folder
app.use(express.static("public"));

app.use("/recipes", recipesRouter);

// ============= dummy data creation script =======
const createRecipe = async (name, ingredients, description = "DNE") => {
  await Recipe.create({
    name,
    ingredients,
    description,
  });
};

Recipe.find({}, (err, foundRecipe) => {
  if (foundRecipe.length == 0) {
    createRecipe(
      "grannyCake 1",
      [{ name: "chocolate", amount: "1 oz" }],
      "yummy"
    );
    createRecipe("grannyCake 2", [{ name: "flour", amount: "2 oz" }], "yummy");
    createRecipe("grannyCake 3", [{ name: "cheese", amount: "3 oz" }], "yummy");
    createRecipe(
      "grannyCake 4",
      [
        { name: "chocolate", amount: "4 oz" },
        { name: "cake", amount: "all of it" },
      ],
      "yummy"
    );
  }
});

app.listen(PORT);
