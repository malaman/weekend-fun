import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';

/**
 * application reducers are combined here
 */
const rootReducer = combineReducers({
 ui,
 user
});

export default rootReducer;
