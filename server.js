const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const rowdy = require('rowdy-logger');
const methodOverride = require("method-override");

const rowdyRes = rowdy.begin(app);



app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(ejsLayouts);
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index', {title: "Welcome"})
})

app.use('/countries', require('./controllers/countriesController'))
app.use('/continents', require('./controllers/continentsController'))

app.get('/continents', (req, res)=>{
  res.render('index', {title: "Continents"})
})

app.get('/countries', (req, res)=>{
  res.render('index', {title: 'Countries'})

})









const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})
