import { combineReducers } from 'redux';

import favorites from './favorites';

const reducers = combineReducers({
  favorites,
});

export default reducers;