const express = require('express')
const rowdy = require('rowdy-logger')
const db = require('./models')

const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const app = express()
// const PORT = process.env.PORT || 3000
const PORT = 3000
const rowdyRes = rowdy.begin(app)


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(methodOverride('_method'))

app.use('/countries', require('./controllers/countriesController'))
app.use('/continents', require('./controllers/continentsController'))

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/index.html')
  res.render('index')
})
app.get('/', (req, res) => {
  res.send('hello from root!')
})

// app.get('*', (req, res)=> {
//   res.render('404')
// })

app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})
