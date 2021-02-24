// Required Modules
const express = require("express");
const rowdy = require("rowdy-logger");
const db = require("./models");
const ejsLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

// Variables
const app = express();
const PORT = 3000;

const rowdyRes = rowdy.begin(app);

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false })); // urlencoded gets the form data from the request and puts it inside of req.body
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index", { name: "Welcome to DIY" });
});

app.use("/countries", require("./controllers/countriesController"));
app.use("/continents", require("./controllers/continentsController"));

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server started!");
  rowdyRes.print();
});
