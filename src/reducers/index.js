import { combineReducers } from 'redux';

import auth from './auth.reducer';
import user from './user.reducer';
import states from './states.reducer';

const rootReducer = combineReducers({
  auth,
  user,
  states
});

export default rootReducer;