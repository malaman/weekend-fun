import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';

const rootReducer = combineReducers({
 ui,
 user
});

export default rootReducer;
