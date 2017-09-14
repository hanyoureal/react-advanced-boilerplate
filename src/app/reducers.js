import { combineReducers } from 'redux';
import { errorReducer } from 'modules/error';
import { sessionReducer } from 'modules/session';
import { homeReducer } from 'modules/home';

export default combineReducers({
  error: errorReducer,
  session: sessionReducer,
  home: homeReducer,
});
