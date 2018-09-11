'use strict'

const Browser = require('zombie');

Browser.localhost('localhost', 3000)

describe('View all listings features', function() {

  // beforeEach(function () {
    const browser = new Browser()
  // })

  describe('/', function() {
    it('gets there and responds', function () {
      browser.visit('/', function() {
        console.log(browser.location.href)
        browser.assert.success();
      })
    })
    it('displays Welcome to MakersBNB', function() {
      browser.visit('/', function() {
        console.log(browser.location.href)
        browser.assert.text('Welcome to MakersBNB');
      })
    })
  })

  describe('/homepage', function() {
    it('displays a listed property', function() {
      browser.visit('/homepage', function () {
      browser.assert.text('London');
      })
    })
  })

  describe('/homepage', function() {
    it('takes you to /homepage/add')
  })


});
