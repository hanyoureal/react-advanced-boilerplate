import { createReducer, createAction } from 'utils/redux-utils';
import {
  getOrders,
} from '../home.api.js';

// --------- ACTION TYPES ----------
export const GET_ORDERS_SUCCESS = 'orders/GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'orders/GET_ORDERS_FAILURE';

// --------- ACTION CREATORS ----------
export const getPoliciesSuccess = (payload) =>
  createAction(GET_ORDERS_SUCCESS, { items: payload });
export const getPoliciesFailure = (payload) =>
  createAction(GET_ORDERS_FAILURE, { error: payload });

export function loadOrders() {
  return (dispatch) => (
    getOrders(
      (error, body) => {
        if (error) {
          dispatch(getPoliciesFailure(error));
        } else {
          dispatch(getPoliciesSuccess(body.members));
        }
      },
    )
  );
}

// ------- REDUCER --------
export const initialState = {
  items: [],
  error: null,
};

const handlers = {
  [GET_ORDERS_SUCCESS]: (state, { payload }) =>
    ({ ...state, items: payload.items, error: null }),
  [GET_ORDERS_FAILURE]: (state, { payload }) =>
    ({ ...state, error: payload.error }),
};

export default createReducer(initialState, handlers);
