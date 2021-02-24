const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const rowdyRes = rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('hello from root!')
})

app.use('/countries', require('./controllers/countriesController'))
app.use('/continents', require('./controllers/continentsController'))

//Routes
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/index.ejs')
  res.render('index')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})
