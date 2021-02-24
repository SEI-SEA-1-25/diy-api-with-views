const router = require('express').Router()
const models = require('../models')

router.get('/', (req, res) => {
  models.country.findAll().then((countries) => {
    res.render('countries/index', { countries })
  })
  .catch((error) => {
    res.json({ error })
  })
})

router.get('/new',  (req, res) => {
  res.render('countries/new')
})

router.get('/:id', async (req, res) => {
  try {
    const country = await models.country.findByPk(req.params.id)
    res.render('countries/show', { country })
  } catch (error) {
    res.json({ error })
  }
})

router.post('/new/createdcountry', async (req, res) => {
  try {
    const newCountry = await models.country.create({
      name: req.body.name,
      founded: req.body.yearfounded,
      population: req.body.population
    })
    res.redirect(`/countries/${newCountry.id}`)
  } catch (err) {
    console.log(err);
  }
})

router.put('/:id/updatedcountry', async (req, res) => {
  try {
    const oneCountry = await models.country.findByPk(req.params.id)
    const updateCountry = await oneCountry.update({
        name: req.body.name,
        founded: req.body.founded,
        population: req.body.population
    })
    res.render('countries/show', { updateCountry })
  } catch (error) {
    res.json({ error })    
  }
})

router.delete('/:id', (req, res) => {
  models.country.destroy({
    where: { id: req.params.id }
  })
  .then((country) => {
    res.redirect('/countries')
  })
  .catch((err) => {
    res.json({ error })
  })
})

module.exports = router