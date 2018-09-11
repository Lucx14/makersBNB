const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const app = express();

// ____ Setup required middleware ____ 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ____ Establish database connection ____ 
MongoClient.connect('mongodb://makers1:makers1@ds251332.mlab.com:51332/makersbnb', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('makersbnb') 
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

//__________ R O U T E S __________
app.get('/', function (req, res) {    // One-line equivalent syntax: (req, res) => res.send('Hello World!'))
  res.render('index')
});

app.get('/homepage', function (req, res) {
  db.collection('properties').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('homepage', {properties: result});
  })
});

app.post('/homepage/add', function(req, res) {
  db.collection('properties').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/homepage')
  })
});

app.get('/createListing', function (req, res) {
  res.render('createListing');
});

app.get('/makeBooking', function (req, res) {
  res.render('makeBooking');
});

app.get('/loginForm', function (req, res) {
  res.render('loginForm');
});
