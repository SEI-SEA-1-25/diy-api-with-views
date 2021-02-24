// const router = require("express").Router();
// const models = require("../models");

// //READ ALL
// router.get("/", (req, res) => {
//   models.country
//     .findAll()
//     .then((countries) => {
//       res.render({ countries });
//     })
//     .catch((error) => {
//       res.render({ error });
//     });
// });

// //Create?
// router.post("/", (req, res) => {
//   models.country
//     .create({
//       name: req.body.name,
//       founded: req.body.founded,
//       population: req.body.population,
//     })
//     .then((country) => {
//       res.render({ country });
//     })
//     .catch((error) => {
//       res.render({ error });
//     });
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const country = await models.country.findByPk(req.params.id);
//     res.render({ country });
//   } catch (error) {
//     res.render({ error });
//   }
// });

// //New Continent Form Route
// router.put("/:id", async (req, res) => {
//   try {
//     await models.country.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     const country = await models.country.findByPk(req.params.id);
//     res.render({ country });
//   } catch (error) {
//     res.render({ error });
//   }
// });

// //Remove Country
// router.delete("/:id", (req, res) => {
//   models.country
//     .destroy({
//       where: { id: req.params.id },
//     })
//     .then((country) => {
//       res.render({ country });
//     })
//     .catch((err) => {
//       res.render({ error });
//     });
// });

// module.exports = router;

const router = require("express").Router();
const db = require("../models");

// CRUD routes for countries
// Index (Read All) Route
router.get("/", async (req, res) => {
  try {
    const countries = await db.country.findAll({ raw: true });
    // console.log(countries)
    // res.send()
    res.render("countries/index", { countries });
  } catch (err) {
    console.log(err);
  }
});

// New country Form Route
router.get("/new", (req, res) => {
  res.render("countries/new");
});

// Show (Show One) Route
router.get("/:id", async (req, res) => {
  try {
    const country = await db.country.findByPk(req.params.id, { raw: true });
    console.log(country);
    res.render("countries/show", { country });
  } catch (err) {
    console.log(err);
  }
});

// Create Route
router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const newCountry = await db.country.create({
      name: req.body.name,
      founded: req.body.founded,
      population: req.body.population,
    });
    res.redirect(`/countries/${newCountry.id}`);
  } catch (err) {
    console.log(err);
  }
});

// Update route
router.put("/:id", async (req, res) => {
  try {
    const country = await db.country.findByPk(req.params.id);
    const updatedCountry = await country.update({
      name: req.body.name,
      founded: req.body.founded,
      population: req.body.population,
    });
    res.redirect(`/countries/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

// Delete route
router.delete("/:id", async (req, res) => {
  try {
    const country = await db.country.findByPk(req.params.id);
    const deletedCountry = await country.destroy();
    res.redirect("/countries");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
