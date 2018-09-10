'use strict'

function List() {
  this.properties = ["Prop1", "Prop2", "Prop3"]
};

List.prototype.all = function() {
  return this.properties;
};

List.prototype.add = function(property) {
  this.properties.push(property);
};


//  actually i think the booking function maybe should belong to the property object ?????
// List.prototype.book = function(property) {
//
// };
