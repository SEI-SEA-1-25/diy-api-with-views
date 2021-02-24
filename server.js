const express = require('express')
const app = express()
const db = require('./models')
const rowdy = require('rowdy-logger')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')


const rowdyRes = rowdy.begin(app)


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('hello from root!')
})


app.use('/countries', require('./controllers/countriesController'))
app.use('/continents', require('./controllers/continentsController'))

app.get('*', (req, res) => {
    res.render('406')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server started!');
    rowdyRes.print()
})