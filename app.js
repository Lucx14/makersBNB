const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


// Body parser middleware - will handle parsing json content - not sure exactly what this does!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
// app.use(express.static(path.join(__dirname, 'public'))) -----no idea if this is necessary!


// middleware to set the view engine - setting it to use ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// creating a dummy object ( i think this is json style notation that we will parse to the browser)
// This is the kind of thing that we will retrieve from our database
const property = {
  name: 'London appartment',
  description: 'a nice flat in central London',
  price: '£100 per night'
};



app.get('/', function (req, res) {    // One-line equivalent syntax: (req, res) => res.send('Hello World!'))
 res.send('Hello World!')
});

app.get('/homepage', function (req, res) {
 res.render('homepage');
});

app.get('/makeBooking', function (req, res) {
 // res.send('This is a string return by a .get http req/res cycle to /makeBooking')
 res.render('makeBooking');
});

app.get('/createListing', function (req, res) {
 // res.send('This is another string returned from the /newListing route')
 res.render('createListing');
});




app.listen(3000, function() {
   console.log('Server started on port 3000!');
});
