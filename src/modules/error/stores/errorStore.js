import { createReducer, createAction } from 'utils/redux-utils';

// --------- ACTION TYPES ----------
export const UPDATE_ERRORS = 'error/UPDATE_ERRORS';
export const CLEAR_ALL_ERRORS = 'error/CLEAR_ALL_ERRORS';


// --------- ACTION CREATORS ----------
export const updateErrors = (payload) =>
  createAction(UPDATE_ERRORS, { errors: payload });
export const clearAllErrors = (payload) =>
  createAction(CLEAR_ALL_ERRORS, { errors: {} });


export function pushError(error) {
  return (dispatch, getState) => {
    const { errors } = getState().error;
    const id = Object.keys(errors).length;
    errors[id] = { ...error, id };
    dispatch(updateErrors({ ...errors }));
  };
}

export function popError({ id }) {
  return (dispatch, getState) => {
    const { errors } = getState().error;
    delete errors[id];
    dispatch(updateErrors({ ...errors }));
  };
}

// ------- REDUCER --------
export const initialState = {
  errors: {},
};

const handlers = {
  [UPDATE_ERRORS]: (state, { payload }) =>
    ({ ...state, errors: payload.errors }),
  [CLEAR_ALL_ERRORS]: (state, { payload }) =>
    ({ ...state, errors: payload.errors }),
};

export default createReducer(initialState, handlers);
