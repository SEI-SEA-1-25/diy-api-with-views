const router = require('express').Router()

const models = require('../models')

router.get('/', async(req, res) => {
    const country = models.country.findAll().then((countries) => {
            res.render('countries/index', { countries })
        })
        .catch((error) => {
            res.render('countries/index', { error })
        })
})

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

router.get('/:id', async(req, res) => {
    try {
        const country = await models.country.findByPk(req.params.id)
        res.render('countries/show', { country })
    } catch (error) {
        res.render('countries/show', { error })
    }
})

router.put('/:id', async(req, res) => {
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


module.exports = router