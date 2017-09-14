import makeRequest from 'services/Api';

const endpoint = '/login';

function postLogIn(json, handler) {
  makeRequest({ method: 'post', endpoint, json }, handler);
}

function deleteLogIn(handler) {
  makeRequest({ method: 'del', endpoint }, handler);
}

export {
  postLogIn,
  deleteLogIn,
};
