// MODULES
const express = require('express')
const rowdy = require('rowdy-logger')
const db = require('./models')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// VARIABLES
const rowdyRes = rowdy.begin(app)
const app = express()

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.get('/', (req, res) => {
  res.send('hello from root!')
})

// CONTROLLERS - grabs from migrations
app.use('/countries', require('./controllers/countriesController'))
app.use('/continents', require('./controllers/continentsController'))


// START SERVER - PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})
