import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

const finalCreateStore = compose(
  applyMiddleware(thunk, promiseMiddleware())
)(createStore);

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  return store;
};
