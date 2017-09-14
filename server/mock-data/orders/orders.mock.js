const _ = require('lodash');
const orderStruct = require('./order.struct').struct;
// const locations = require('../locations/locations.mock').items;
// const destinations = require('../destinations/destinations.mock').items;
const mapObjectToStruct = require('../../utils/common').mapObjectToStruct;
const getRandomInt = require('../../utils/common').getRandomInt;
const getRandomDate = require('../../utils/common').getRandomDate;

const ITEMS_TO_GENERATE = 10;
const items = [];
let idx = 0;

function createItem(item) {
  const addedItem = item;
  idx++; // eslint-disable-line
  if (!addedItem) {
    const randomItem = mapObjectToStruct(
      orderStruct,
      Object.assign({}, {
        id: idx,
        estimatedPrice: getRandomInt(10, 100),
        currency: 'RON',
        createdDate: getRandomDate(),
        modifiedDate: getRandomDate(),
      }));

    items.push(randomItem);
  } else {
    addedItem.id = idx;
    addedItem.estimatedPrice = addedItem.estimatedPrice || getRandomInt();
    addedItem.currency = addedItem.currency || 'RON';
    addedItem.createdDate = addedItem.createdDate || getRandomDate();
    addedItem.modifiedDate = addedItem.modifiedDate || getRandomDate();

    items.push(mapObjectToStruct(orderStruct, addedItem));
  }
}

_.times(ITEMS_TO_GENERATE, () => createItem());

const mod = {
  items,
  createItem,
};

module.exports = () => mod;
