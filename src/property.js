'use strict'

function Property() {
  this.name = "Nice flat";
  this.description = "good location";
  this.price = "£100 per night";
  this.available = true;
};


Property.prototype.propertyName = function() {
  return this.name;
};

Property.prototype.propertyDescription = function() {
  return this.description;
};

Property.prototype.propertyPrice = function() {
  return this.price;
};

Property.prototype.propertyAvailable = function() {
  return this.available;
};
