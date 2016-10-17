import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';

import Routes from '../routes';
/**
 * In order to display Dev tools uncomment <DevTools /> component
 */
module.exports = class Root extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  render() {
    const { store } = this.props;
    return (

      <Provider store={store}>
        <div>
          <Routes />
          {/*<DevTools />*/}
        </div>
      </Provider>
    );
  }
};
