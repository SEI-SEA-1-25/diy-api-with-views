const router = require('express').Router()

const models = require('../models')

//show all
router.get('/', (req, res) => {
  models.continent.findAll().then((continents) => {
    res.render('continents/index', { continents })
  })
})

router.get('/new', (req, res) => {
  res.render('/continents/new')
})

router.post('/', (req, res) => {
  models.continent.create({
    name: req.body.name,
  }).then((continent) => {
    res.json({continent})
  })
})

//show one
router.get('/:id', (req, res) => {
  models.findByPk(req.params.id).then((continent => {
    res.render('countries/show', { continent })
  }))
})


router.post('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id)

  const country = await continent.createCountry({
    name: req.body.name,
    founded: req.body.founded,
    population: req.body.population,
  })

  res.redirect('/continents/show', {country})
})

router.get('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id)

  const countries = await continent.getCountries()

  res.render('continents/countries', { countries, continent })
})



router.delete('/:id', (req, res) => {
  models.continent.destroy({
    where: { id: req.params.id }
  })
  .then((continent) => {
    res.redirect('/continents/index', { continents })
  })
  .catch((err) => {
    res.json({ error })
  })
})

module.exports = router