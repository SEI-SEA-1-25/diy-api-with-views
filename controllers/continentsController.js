const router = require('express').Router()
const models = require('../models')

router.get('/', (req, res) => {
  models.continent.findAll({ raw: true }).then((continents) => {
    res.render('continents/index', { continents })
  })
})

// New Continent Form Route
router.get('/new', (req, res) => {
  res.render('continents/new')
})

router.get('/all_children', (req, res) => {
  res.render('continents/all_children')
})

router.get('/new_child', (req, res) => {
  res.render('continents/new_child')
})

router.post('/', (req, res) => {
  models.continent.create({
    name: req.body.name,
    size: req.body.size
  }).then((continent) => {
    res.redirect(`/continents/${continent.id}`)
  })
  .catch((error) => {
    res.json({ error })
  })
})

router.get('/:id', (req, res) => {
  models.continent.findByPk(req.params.id, { raw: true }).then((continent => {
    res.render('continents/show', { continent })
  }))
  .catch((error) => {
    res.json({ error })
  })
})

router.put('/:id', async (req, res) => {
  try {
    await models.continent.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    const continent = await models.continent.findByPk(req.params.id)
    res.redirect(`/continents/${req.params.id}`)
  } catch (error) {
    res.json({ error })    
  }
})

router.delete('/:id', (req, res) => {
  models.continent.destroy({
    where: { id: req.params.id }
  })
  .then((continent) => {
    res.redirect('/continents')
  })
  .catch((err) => {
    res.json({ error })
  })
})

router.post('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id)

  const country = await continent.createCountry({
    name: req.body.name,
    founded: req.body.founded,
    population: req.body.population,
  })

  res.json({country})
})

router.get('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id, { raw: true })

  const countries = await continent.getCountries()

  res.render(`continents/${req.params.id}/countries`, { countries })
})

module.exports = router