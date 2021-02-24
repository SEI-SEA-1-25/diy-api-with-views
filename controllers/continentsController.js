const router = require('express').Router()
const models = require('../models')
//              //               //


//              //               //
//      GET    │ /continents     //
//              //               //
router.get('/', (req, res) => {
  models.continent.findAll().then((continents) => {
    
    res.render(countries/show',{
      
    })
    // res.json({ continents })
  })
})
//              //               //


//              //               //
//     POST   │ /continents      //
//              //               //
router.post('/', (req, res) => {
  models.continent.create({
    name: req.body.name,
  }).then((continent) => {
    res.json({continent})
  })
})
//              //               //


//              //              //
// GET    │ /continents/:id     //
//              //              //
router.get('/:id', (req, res) => {
  models.findByPk(req.params.id).then((continent => {
    res.json({ continent })
  }))
})
//              //               //


//                    //                  //
//    POST   │ /continents/:id/countries  //
//                    //                  //
router.post('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id)
  const country = await continent.createCountry({
    name: req.body.name,
    founded: req.body.founded,
    population: req.body.population,
  })

  res.json({country})
})
//              //               //


//                 //                 //
// GET   │ /continents/:id/countries  //
//                 //                 //
router.get('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id)

  const countries = await continent.getCountries()

  res.json({ countries })
})
//              //               //



module.exports = router