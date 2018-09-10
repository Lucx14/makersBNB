'use strict'


function List() {


  this.properties = ["Prop1", "Prop2", "Prop3"]
};



List.prototype.all = function() {

  return this.properties;
};
