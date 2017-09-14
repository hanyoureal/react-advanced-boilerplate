const _ = require('lodash');
const errorModel = require('./constants').errorModel;

const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;
const getRandomDate = () =>
  JSON.parse(JSON.stringify(new Date(getRandomInt(2013, 2017), getRandomInt(3, 7),
  getRandomInt(1, 10), getRandomInt(1, 22), getRandomInt(5, 55))));
const mapObjectToStruct = (struct, value) => _.pick(value, Object.keys(struct));

function createErrorObject(message, details = '', errorCode = '') {
  return mapObjectToStruct(errorModel,
    Object.assign({}, {
      message,
      details,
      errorCode,
    }));
}

module.exports = {
  getRandomInt,
  getRandomDate,
  mapObjectToStruct,
  createErrorObject,
};
