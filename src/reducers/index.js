import { combineReducers } from 'redux';

import user from './user.reducer';
import usStates from './us-states.reducer';
import error from './error.reducer';

const rootReducer = combineReducers({
  user,
  usStates,
  error
});

export default rootReducer;