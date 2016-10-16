import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Miss from 'react-router/Miss';

import Header from '../components/Header';
import Footer from '../components/Footer';
import NotFound from '../components/NotFound';
import LoadingIndicator from '../components/LoadingIndicator';

import {MatchWithSubRoutes} from '../routes';

class App extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  render() {
    const {routes, info} = this.props;
    const {username, name} = info;
    return (
        <div className="container">
          <LoadingIndicator isLoading={this.props.isLoading} />
          <Header username={username} name={name} />
          {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
          <Miss component={NotFound} />
          <Footer />
        </div>
    );
  }
}

App.propTypes = {
  routes: PropTypes.array.isRequired,
  info: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    info: state.user.info,
    isLoading: state.ui.isLoading
  };
}

export default connect(
  mapStateToProps
)(App);
