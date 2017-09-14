import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';

const middlewaresUsed = [promise(), thunk];
let composeEnhancers = compose;

// if (process.env.NODE_ENV === 'development') {
const logger = createLogger({
  collapsed: true,
});

middlewaresUsed.push(logger);

composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
// }

const enhancer = composeEnhancers(applyMiddleware(...middlewaresUsed));

export default createStore(reducer, enhancer);
