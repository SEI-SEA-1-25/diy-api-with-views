const router = require('express').Router()
const models = require('../models')
const continent = require('../models/continent')

//show all contienents 
router.get('/', (req, res) => {
  models.continent.findAll({ raw: true }).then((continents) => {
    res.render('continents/index', { continents })
  })
})

router.get('/new', (req, res) => {
  res.render('continents/new')
})
router.get('/new_country', (req, res) => {
  res.render('continents/new_country')
})
router.get('/continent_countries', (req, res) => {
  res.render('continents/continent_countries')
})
//create continent
router.post('/', (req, res) => {
  models.continent.create({
    name: req.body.name,
    size: req.body.size
  }).then((continent) => {
    res.redirect(`/continents/${continent.id}`)
  })
})
// show one continent
router.get('/:id', (req, res) => {
  models.continent.findByPk(req.params.id).then((continent => {
    res.render('continents/show', { continent })
  }))
  .catch((error) => {
    res.render({ error })
  })
})
// show all countries in a continent

router.get('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id, { raw: true })

  const countries = await continent.getCountries()

  res.render(`continents/${req.params.id}/countries`, { countries })
})

router.post('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id)

  const country = await continent.createCountry({
    name: req.body.name,
    founded: req.body.founded,
    population: req.body.population,
  })

  res.render({country})
})

//update country
router.put('/:id', async (req, res) => {
  try {
    await models.continent.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    await models.continent.findByPk(req.params.id)
    res.redirect(`/continents/${req.params.id}`)
  } catch (error) {
    res.json({ error })    
  }
})
//delete country
router.delete('/:id', (req, res) => {
  models.continent.destroy({
    where: { id: req.params.id }
  })
  .then(() => {
    res.redirect('/continents')
  })
  .catch((err) => {
    res.json({ error })
  })
})

module.exports = router