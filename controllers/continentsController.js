// const router = require("express").Router();
// const models = require("../models");

// //READ ALL
// router.get("/", (req, res) => {
//   models.continent.findAll().then((continents) => {
//     res.render({ continents });
//   });
// });

// //Create?
// router.post("/", (req, res) => {
//   models.continent
//     .create({
//       name: req.body.name,
//     })
//     .then((continent) => {
//       res.render({ continent });
//     });
// });

// //New Continent Form Route
// router.get("/:id", (req, res) => {
//   models.findByPk(req.params.id).then((continent) => {
//     res.render({ continent });
//   });
// });

// //Create New Continent
// router.post("/:id/countries", async (req, res) => {
//   const continent = await models.continent.findByPk(req.params.id);

//   const country = await continent.createCountry({
//     name: req.body.name,
//     founded: req.body.founded,
//     population: req.body.population,
//   });

//   res.render({ country });
// });

// //Read One
// router.get("/:id/countries", async (req, res) => {
//   const continent = await models.continent.findByPk(req.params.id);

//   const countries = await continent.getCountries();

//   res.render({ countries });
// });

// module.exports = router;
const router = require("express").Router();
const db = require("../models");

// CRUD routes for continents
// Index (Read All) Route
router.get("/", async (req, res) => {
  try {
    const continents = await db.continent.findAll({ raw: true });
    // console.log(continents)
    // res.send()
    res.render("continents/index", { continents });
  } catch (err) {
    console.log(err);
  }
});

// New continent Form Route
router.get("/new", (req, res) => {
  res.render("continents/new");
});

// Show (Show One) Route
router.get("/:id", async (req, res) => {
  try {
    const continent = await db.continent.findByPk(req.params.id, { raw: true });
    console.log(continent);
    res.render("continents/show", { continent });
  } catch (err) {
    console.log(err);
  }
});

// Create Route
router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const newContinent = await db.continent.create({
      name: req.body.name,
      size: req.body.size,
    });
    res.redirect(`/continents/${newContinent.id}`);
  } catch (err) {
    console.log(err);
  }
});

// Update route
router.put("/:id", async (req, res) => {
  try {
    const continent = await db.continent.findByPk(req.params.id);
    const updatedContinent = await continent.update({
      name: req.body.name,
      size: req.body.size,
    });
    res.redirect(`/continents/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

// Delete route
router.delete("/:id", async (req, res) => {
  try {
    const continent = await db.continent.findByPk(req.params.id);
    const deletedContinent = await continent.destroy();
    res.redirect("/continents");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
