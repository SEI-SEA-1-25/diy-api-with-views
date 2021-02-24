const router = require('express').Router()
const models = require('../models')

// Index (read all) route -- GOOD
router.get('/', (req, res) => {
  models.country.findAll().then((countries) => {
    // res.json({ countries })
    res.render('countries/index', { countries })
  })
    .catch((error) => {
      console.log(error)
    })
})

// New country from route -- GOOD
router.get('/new', (req, res) => {
  res.render("countries/new")
})


// CREATE ROUTE /////
router.post('/', async (req, res) => {
  try {
    const newCountry = await models.country.create({
      name: req.body.name,
      founded: req.body.founded,
      population: req.body.population
    })
    res.redirect(`/countries/${newCountry.id}`);
  } catch (error) {
    console.log(error)
  }
})


// SHOW ONE /// -- GOOD
router.get('/:id', async (req, res) => {
  try {
    const country = await models.country.findByPk(req.params.id, { raw: true })
    res.render('countries/show', { country })
  } catch (error) {
    console.log(error)
  }
})

// UPDATE ROUTE
router.put('/:id', async (req, res) => {
  try {
    await models.country.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    const country = await models.country.findByPk(req.params.id)
    res.redirect(`/countries/${req.params.id}`)
  } catch (error) {
    console.log(error)
  }
})


// DELETE ROUTE -- GOOD
router.delete('/:id', (req, res) => {
  models.country.destroy({
    where: { id: req.params.id }
  })
    .then((country) => {
      res.redirect('/countries');
    })
    .catch((err) => {
      console.log(err)
    })
})


module.exports = router