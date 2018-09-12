import {
  getListings,
  addNewListing,
} from '../controllers/listingController';

const routes = (app) => {
  app.route('/listings')
  .get(getListings)
  .post(addNewListing)
}

export default routes;
