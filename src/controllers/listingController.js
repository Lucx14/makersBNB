import mongoose from 'mongoose';

import { ListingSchema } from '../models/listingModel';

const Listing = mongoose.model('listing', ListingSchema);

export const getListings = (req, res) => {
  Listing.find({}, (err, listing) => {
    if (err) { 
      res.send(err);
    } 
    res.json(listing);
    // res.render('ejsfile', listing)
  });
};

export const addNewListing = (req, res) => {
  let newListing = new Listing(req.body);

  newListing.save((err, listing) => {
    if (err) { 
      res.send(err);
    } 
    res.json(listing);
  });
};
