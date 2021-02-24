const router = require("express").Router();
const db = require("../models");

// INDEX route
router.get("/", async (req, res) => {
  try {
    const countrys = await db.country.findAll({ raw: true });
    // console.log(countrys)
    // res.send()
    res.render("countries/index", { countrys: countrys });
  } catch (err) {
    console.log(err);
  }
});

// New country form route
router.get("/new", (req, res) => {
  res.render("countries/new");
});

// SHOW countrys
router.get("/:id", async (req, res) => {
  try {
    const country = await db.country.findByPk(req.params.id, { raw: true });
    console.log(country);
    const countrys = await db.country.findAll({ raw: true });
    res.render("countries/show", { country });
  } catch (err) {
    console.log(err);
  }
});

// Create route
router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const newcountry = await db.country.create({
      name: req.body.name,
      population: req.body.population,
    });
    res.redirect(`/countries/${newcountry.id}`);
  } catch (err) {
    console.log(err);
  }
});

// UPDATE route
router.put("/:id", async (req, res) => {
  try {
    const country = await db.country.findByPk(req.params.id);
    const updatedcountry = await country.update({
      type: req.body.type,
      img_url: req.body.img_url,
    });
    res.redirect(`/countries/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

// DELETE route
router.delete("/:id", async (req, res) => {
  try {
    const country = await db.country.findByPk(req.params.id);
    const deletedcountry = await country.destroy();
    res.redirect("/countries");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
