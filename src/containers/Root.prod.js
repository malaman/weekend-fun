import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes';

module.exports = class Root extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Routes  />
      </Provider>
    );
  }
};
