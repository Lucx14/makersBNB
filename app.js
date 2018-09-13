const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session')

//____Authentication with Mongoose___
const mongoose = require('mongoose')

// _______USER SCHEMA _______
var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

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

//_______Authenticate input against database_______
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// _______ MIDDLEWARE _______
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

// ____ Establish MongoDB connection ____
MongoClient.connect('mongodb://makers1:makers1@ds251332.mlab.com:51332/makersbnb', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('makersbnb')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

// ____ Establish Mongoose database connection ____
mongoose.connect('mongodb://makers1:makers1@ds251332.mlab.com:51332/makersbnb');

//__________ R O U T E S __________
app.get('/', function (req, res) {    // One-line equivalent syntax: (req, res) => res.send('Hello World!'))
  res.render('index')
});

app.get('/signup', function (req, res) {
 res.render('signUp');
});

app.post('/signUp', function (req, res) {
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
  // db.collection('users').insertOne(req.body, (err, result) => {
  //   if (err) return console.log(err)
  //   res.redirect('/login');
  // });
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

app.get('/logIn', function(req, res) {
  res.render('loginForm');
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
