const router = require('express').Router()
const models = require('../models')

router.get('/', (req, res) => {
  models.continent.findAll().then((continent) => {
    res.render('continents/index', { continent })
  })
  .catch((error) => {
    res.json({ error })
  })
})

router.get('/new',  (req, res) => {
  res.render('continents/new')
})

router.get('/:id', async (req, res) => {
  try {
    const continent = await models.continent.findByPk(req.params.id)
    res.render('continents/show', { continent })
  } catch (error) {
    res.json({ error })
  }
})

router.post('/new/createdcontinent', async (req, res) => {
  try {
    const newContinent = await models.continent.create({
      name: req.body.name,
      size: req.body.size,
    })
    res.redirect(`/continents/${newContinent.id}`)
  } catch (err) {
    console.log(err);
  }
})

router.put('/:id/updatedcontinent', async (req, res) => {
  try {
    const oneContinent = await models.continent.findByPk(req.params.id)
    const updateContinent = await oneContinent.update({
        name: req.body.name,
        size: req.body.size,
    })
    res.render('continents/show', { updateContinent })
  } catch (error) {
    res.json({ error })    
  }
})

router.delete('/:id', (req, res) => {
  models.continent.destroy({
    where: { id: req.params.id }
  })
  .then((country) => {
    res.redirect('/continents')
  })
  .catch((err) => {
    res.json({ error })
  })
})


module.exports = router