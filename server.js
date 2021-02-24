const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const rowdyRes = rowdy.begin(app)
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(ejsLayouts)

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.render('index')
})

app.use('/countries', require('./controllers/countriesController'))
app.use('/continents', require('./controllers/continentsController'))



app.get('*', (req, res) => {
  res.render('404')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})
