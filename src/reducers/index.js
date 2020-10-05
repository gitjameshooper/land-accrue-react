import { combineReducers } from 'redux';

import auth from './auth.reducer';
import user from './user.reducer';
import states from './states.reducer';
import error from './error.reducer';

const rootReducer = combineReducers({
  auth,
  user,
  states,
  error
});

export default rootReducer;