const express = require('express')
const app = express()

app.get('/', function (req, res) {    // One-line equivalent syntax: (req, res) => res.send('Hello World!'))
 res.send('Hello World!')
})

app.get('/homepage', function (req, res) {
 res.send('This is the string returned by a JS route .get request to /homepage')
})

app.get('/makeBooking', function (req, res) {
 res.send('This is a string return by a .get http req/res cycle to /makeBooking')
})

app.get('/createListing', function (req, res) {
 res.send('This is another string returned from the /newListing route')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
