import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';
import promiseMiddleware from 'redux-promise-middleware';

const logger = createLogger();
/**
 * thunk, logger, promiseMiddleware are used as redux middleware
 *
 * uncomment logger to receive debug information in browser console
 */
const finalCreateStore = compose(
  applyMiddleware(/*logger,*/ thunk, promiseMiddleware()),
  DevTools.instrument()
)(createStore);

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};
