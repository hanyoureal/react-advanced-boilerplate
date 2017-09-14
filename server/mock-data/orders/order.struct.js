// const Location = require('../locations/location.struct');
// const Destination = require('../destinations/destination.struct');

const orderStruct = Object.freeze({
  id: String,
  estimatedPrice: String,
  currency: String,
  // destination: Destination,
  // location: Location,
  createdDate: Number,
  modifiedDate: Number,
});

module.exports = {
  struct: orderStruct,
};
