import { createReducer, createAction } from 'utils/redux-utils';
import { clearAllErrors } from 'modules/error/stores/errorStore';
import Cookies from 'js-cookie';
import {
  postLogIn,
  deleteLogIn,
} from '../session.api.js';

// --------- ACTION TYPES ----------
export const SET_LOGGED_USER = 'session/SET_LOGGED_USER';
export const CLEAR_LOGGED_USER = 'session/CLEAR_LOGGED_USER';
export const LOGIN_SUCCESS = 'session/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'session/LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'session/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'session/LOGOUT_FAILURE';

// --------- ACTION CREATORS ----------
export const setLoggedUser = (payload) =>
  createAction(SET_LOGGED_USER, { loggedUser: payload });
export const clearLoggedUser = () =>
  createAction(CLEAR_LOGGED_USER, { loggedUser: null });
export const loginSuccess = () =>
  createAction(LOGIN_SUCCESS);
export const loginFailure = (payload) =>
  createAction(LOGIN_FAILURE, { error: payload });
export const logoutSuccess = () =>
  createAction(LOGOUT_SUCCESS);
export const logoutFailure = (payload) =>
  createAction(LOGOUT_FAILURE, { error: payload });

export function logIn({ username, password }) {
  return (dispatch) => (
    postLogIn(
      { username, password },
      (error, body) => {
        if (error) {
          dispatch(loginFailure(error));
        } else {
          dispatch(clearAllErrors());
          dispatch(loginSuccess());
          dispatch(setLoggedUser(body.session));
          Cookies.set('session', body.session);
        }
      },
    )
  );
}

export function logOut() {
  return (dispatch) => (
    deleteLogIn(
      (error, body) => {
        if (error) {
          dispatch(logoutFailure(error));
        } else {
          dispatch(logoutSuccess());
          dispatch(clearLoggedUser());
        }
      },
    )
  );
}

// ------- REDUCER --------
export const initialState = {
  loggedUser: null,
  error: null,
};

const handlers = {
  [CLEAR_LOGGED_USER]: (state, { payload }) =>
    ({ ...state, loggedUser: payload.loggedUser, error: null }),
  [SET_LOGGED_USER]: (state, { payload }) =>
    ({ ...state, loggedUser: payload.loggedUser, error: null }),
  [LOGIN_SUCCESS]: (state) =>
    ({ ...state, error: null }),
  [LOGIN_FAILURE]: (state, { payload }) =>
    ({ ...state, error: payload.error }),
  [LOGOUT_SUCCESS]: (state) =>
    ({ ...state, error: null }),
  [LOGOUT_FAILURE]: (state, { payload }) =>
    ({ ...state, error: payload.error }),
};

export default createReducer(initialState, handlers);
