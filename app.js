const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const app = express();
const bcrypt = require('bcrypt');


//____Trying to set up Authentication with Mongoose___
const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true }
  
});

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

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

// ____ Establish database connection using mongoose____
mongoose.connect('mongodb://makers1:makers1@ds251332.mlab.com:51332/makersbnb');

//__________ R O U T E S __________
app.get('/', function (req, res) {    // One-line equivalent syntax: (req, res) => res.send('Hello World!'))
  res.render('index')
});

app.get('/signup', function (req, res) {
 res.render('signUp');
});

app.post('/signUp', function (req, res) {
  db.collection('users').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/login');
  });
});

app.get('/logIn', function(req, res) {
  res.render('loginForm');
});

app.post('/logIn', function (req, res) {
  if (req.body.email && req.body.password) {
    var userData = {
      email: req.body.email,
      password: req.body.password
    }
  }   
  User.create(userData, function (err, user) {
    if (err) {
      return console.log(err)
    } else {
      console.log(userData)
      return res.redirect('/homepage');
    }
  })
});

app.get('/homepage', function (req, res) {
  db.collection('properties').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('homepage', {properties: result});
  });
});

app.post('/homepage/add', function(req, res) {
  db.collection('properties').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/homepage');
  });
});

app.get('/createListing', function (req, res) {
  res.render('createListing');
});

app.get('/makeBooking', function (req, res) {
  res.render('makeBooking');
});

app.post('/bookings/add', function(req, res) {
  db.collection('bookings').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/homepage');
  });
});
