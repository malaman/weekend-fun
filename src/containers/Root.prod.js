import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes';

module.exports = class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Routes history={history} />
      </Provider>
    );
  }
};