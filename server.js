const express = require('express');
const rowdy = require('rowdy-logger');




//              //               //
//          Varianles            //
//              //               //
const app = express();
const PORT = 3000;
const rowdyResults = rowdy.begin(app);
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
//              //               //


//              //               //
//          Middleware           //
//              //               //
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(methodOverride('_method'));
//              //               //


//              //               //
//          Controllers          //
//              //               //
app.use('/countries', require('./controllers/countriesController'));
app.use('/continents', require('./controllers/continentsController'));
//              //               //


//              //               //
//            Routes             //
//              //               //
app.get('/', (req, res) => {
  res.send('hello from root!')
});
//             catch             //
app.get((req, res) =>{
  res.render('404.js')
});
//              //               //



//              //               //
//            Server             //
//              //               //
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Server is listening on port ${PORT}`)
});
