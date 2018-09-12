import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ListingSchema = new Schema({
  listingName: {
    type: String,
    required: 'Enter a listing name'
  },
  description: {
    type: String,
    required: 'Enter a description'
  },
  city: {
    type: String,
    required: 'Enter a city'
  },
  price: {
    type: Number,
    required: 'Enter a price'
  }
});
