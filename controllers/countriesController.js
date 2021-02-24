const router = require('express').Router()
const models = require('../models')
//              //               //


//              //               //
//       GET     /countries      //
//              //               //
router.get('/', (req, res) => {
  models.country.findAll().then((countries) => {
    res.json({ countries })
  })
  .catch((error) => {
    res.json({ error })
  })
})
//              //               //


//              //               //
//    POST    / countries        //
//              //               //
router.post('/', (req, res) => {
  models.country.create({
    name: req.body.name,
    founded: req.body.founded,
    population: req.body.population
  }).then((country) => {
    res.json({ country })
  })
  .catch((error) => {
    res.json({ error })
  })
})
//              //               //


//              //               //
//     GET    │ /countries/:id   //
//              //               //
router.get('/:id', async (req, res) => {
  try {
    const country = await models.country.findByPk(req.params.id)
    res.json({ country })
  } catch (error) {
    res.json({ error })
  }
})
//              //               //


//              //               //
//     PUT    │ /countries/:id   //
//              //               //
router.put('/:id', async (req, res) => {
  try {
    await models.country.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    const country = await models.country.findByPk(req.params.id)
    res.json({ country })
  } catch (error) {
    res.json({ error })
  }
})
//              //               //


//              //               //
//   DELETE │ /countries/:id     //
//              //               //
router.delete('/:id', (req, res) => {
  models.country.destroy({
    where: { id: req.params.id }
  })
  .then((country) => {
    res.json({ country })
  })
  .catch((err) => {
    res.json({ error })
  })
})
//              //               //


module.exports = router