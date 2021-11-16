require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODBURI;
const methodOverride = require("method-override");
const session = require("express-session");
const mongoose = require("mongoose");
const recipesRouter = require("./controllers/recipes");

//===============Middleware===================
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
});

app.use(
  session({
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

app.listen(PORT);
