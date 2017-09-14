import makeRequest from 'services/Api';

const endpoint = '/orders';

function getOrders(handler) {
  makeRequest({ method: 'get', endpoint }, handler);
}

export {
  getOrders, // eslint-disable-line
};
