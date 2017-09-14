/**
 * createAction
 * @param  {string} type            The action type.
 * @param  {string} path            Path to forward location to after action.
 * @param  {object} defaultPayload  Default object to use for payload.
 * @return {function}               Action creator function.
 */
export function createAction(type, payload = {}, path = null) {
  const action = { type, payload };
  if (path) {
    action.meta = { transition: () => ({ pathname: path }) };
  }
  return action;
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
