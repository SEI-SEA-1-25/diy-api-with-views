const router = require('express').Router()

const models = require('../models')

router.get('/', (req, res) => {
  models.country.findAll().then((countries) => {
    // res.render('countries/index', { countries })
    res.render('countries/index', { countries })
  })
  .catch((error) => {
    res.json({ error })
  })
})

router.post('/', async (req, res) => {
  try{
    const newCountries = await models.country.create({
      name: req.body.name,
      founded: req.body.founded,
      population: req.body.population
    })
    res.redirect(`/countries/${newCountries.id}`)

  }catch(err){
    console.log(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const country = await models.country.findByPk(req.params.id)
    res.render('countries/show',{ country })
  } catch (error) {
    res.json({ error })
  }
})

router.put('/:id', async (req, res) => {
  try {
    await models.country.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    const country = await models.country.findByPk(req.params.id)
    res.redirect(`/countries/${country}`)
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