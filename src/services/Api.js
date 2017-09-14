import request from 'superagent';
import Cookies from 'js-cookie';
import { clearLoggedUser } from 'modules/session/stores/sessionStore';
import { pushError } from 'modules/error/stores/errorStore';

const STATUS_CODES = {
  UNAUTHORIZED: 401,
};

const DEFAULT_ERROR = { message: 'An error has occured', errorCode: 'unknown_error' };

const serverData = {
  baseUrl: 'http://localhost:3014',
  headers: {
    base: {
      'Content-Type': 'application/json',
    },
  },
};

// const baseRequest = request.defaults(serverData.headers.base);

export default function makeRequest({ method, endpoint, json }, handler) {
  const store = require('app/store'); //eslint-disable-line
  const loggedUser = store.default.getState().session.loggedUser;
  const token = loggedUser ? loggedUser.token : null;
  const options = {
    headers: { token },
    url: serverData.baseUrl + endpoint,
    method,
    json,
  };

  const requestMap = {
    post: request.post,
    get: request.get,
    del: request.del,
    put: request.put,
  };

  requestMap[options.method](options.url)
    .send(json)
    .set(options.headers)
    .end((err, resp, body) => {
      if (resp.statusCode && resp.statusCode === STATUS_CODES.UNAUTHORIZED) {
        Cookies.remove('session');
        return store.default.dispatch(clearLoggedUser());
      }

      if (err || resp.statusCode >= 400) {
        const error = resp.body || err || DEFAULT_ERROR;
        store.default.dispatch(pushError(error));
        return handler(error, null);
      }

      return handler(null, resp.body);
    });
}
