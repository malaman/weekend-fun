import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import Routes from '../routes';

module.exports = class Root extends Component {
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
