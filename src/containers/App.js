import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

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
          <Header username={username} name={name} />
          {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
          <Footer />
        </div>
    );
  }
}

App.propTypes = {
  routes: PropTypes.array.isRequired,
  info: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    info: state.user.info
  };
}

export default connect(
  mapStateToProps
)(App);
