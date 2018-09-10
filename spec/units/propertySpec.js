'use strict'

describe('Property', function() {

  var property;
  beforeEach(function() {
    property = new Property();
  });

  it('can return its name', function() {
    expect(property.propertyName()).toEqual("Nice flat");
  });
  it('can return its description', function() {
    expect(property.propertyDescription()).toEqual("good location");
  });
  it('can return its price', function() {
    expect(property.propertyPrice()).toEqual("£100 per night");
  });
  it('can return its status', function() {
    expect(property.propertyAvailable()).toBe(true);
  });



});
