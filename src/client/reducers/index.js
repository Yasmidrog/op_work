import goods from './goodReducer.js';
import login from './loginReducer.js';
import errors from './errorReducer.js';

import {combineReducers} from 'redux'
const rootReducer = combineReducers({
  goods, login, errors
});

export default rootReducer;
