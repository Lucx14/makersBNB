const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient

const app = express();

// Body parser middleware - will handle parsing json content - not sure exactly what this does!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
// app.use(express.static(path.join(__dirname, 'public'))) -----no idea if this is necessary!

// middleware to set the view engine - setting it to use ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Establish database connection 
// Change mongo database path for testing environment
MongoClient.connect('mongodb://makers1:makers1@ds251332.mlab.com:51332/makersbnb', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('makersbnb') 
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

//__________ROUTES____________

app.get('/', function (req, res) {    // One-line equivalent syntax: (req, res) => res.send('Hello World!'))
 res.render('index')
});

app.get('/homepage', function (req, res) {
  db.collection('properties').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('homepage', {properties: result});
    console.log(result)
  })
});

app.post('/homepage/add', function(req, res) {
    db.collection('properties').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log(result)
      res.redirect('/homepage')
    })
  });

app.get('/makeBooking', function (req, res) {
 res.render('makeBooking');
});

app.get('/createListing', function (req, res) {
 // res.send('This is another string returned from the /newListing route')
 res.render('createListing');
});

// throwing in a route to a login form if we need one later
app.get('/loginForm', function (req, res) {
  res.render('loginForm');
});

