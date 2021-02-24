// MODULES
const express = require('express')
const rowdy = require('rowdy-logger')
const models = require('./models')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// VARIABLES
const app = express()
const rowdyRes = rowdy.begin(app)


// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// CONTROLLERS - grabs from migrations
app.use('/countries', require('./controllers/countriesController'))
app.use('/continents', require('./controllers/continentsController'))

// ROUTES
app.get('/', (req, res) => {
  res.render('index')
})

// START SERVER - PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})
