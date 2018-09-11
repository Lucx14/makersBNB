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
// as a user/landlord
// so that i can advertise my property for
// i want to be able to add my property to the website
  it('user can add a property to the list', function() {
    list.add("Prop4");
    expect(list.all()).toEqual(["Prop1", "Prop2", "Prop3", "Prop4"]);
  });
// as a user (looking to rent a space)
// so i can organise a place to stay
// i want to be able to click on a property and make a booking
// thinking that booking should be a properety of the
// it('user can make a booking', function() {
//   expect(list.createBooking(Prop1)).not.toBeUndefined
// });
});
