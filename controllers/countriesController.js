const router = require('express').Router()

const models = require('../models')


//Finding all countries
router.get('/', async (req, res) => {
  try{
      const countries = await models.country.findAll({ raw: true })
 
    res.render('countries/index', { countries })
  } catch(error) {
    res.json({ error })
  } 
})


// To render the New.ejs file properly when clicking the link 
router.get('/new', (req, res) => {
  res.render("countries/new")
})


//Creating a new country and subsequent data
router.post('/', async (req, res) => {
    try{
      const newCountry = await models.country.create({
        name: req.body.name,
        founded: req.body.founded,
        population: req.body.population
      })
      res.redirect(`/countries/${newCountry.id}`)
    }catch(error){
      console.log(error)
    }
})

//Show Single Country
router.get('/:id', async (req, res) => {
  try {
    const country = await models.country.findByPk(req.params.id, { raw: true })
    res.render('countries/show', { country })
  } catch (error) {
    res.json({ error })
  }
})

//Update info on a single country
router.put('/:id', async (req, res) => {
  try {
    const country = await models.country.findByPk(req.params.id)
    const updatedCountry = await country.update({
      name: req.body.name,
      founded: req.body.founded,
      population: req.body.population
    })
    
    res.redirect(`/countries/${req.params.id}`)
  } catch (error) {
    console.log(error)  
  }
})

//Delete a country
router.delete('/:id', async (req, res) => {
  try{
    const country = await models.country.findByPk(req.params.id)
    const deletedCountry = await country.destroy();
    res.redirect('/countries')
  }catch(error){
    console.log(error)
  }

})

module.exports = router