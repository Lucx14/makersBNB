'use strict'


describe('List', function() {

  var list;
  beforeEach(function() {
    list = new List();
  });

// as a user
// so that i can see the available properties
// i want to be able to see a list of the available properties
  it('user can see a list of properties', function() {
    expect(list.all()).toEqual(["Prop1", "Prop2", "Prop3"])
  });

});
