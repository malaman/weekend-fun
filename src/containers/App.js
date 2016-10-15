import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Footer from '../components/Footer';
import {MatchWithSubRoutes} from '../routes';

export default class App extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  render() {
    const {routes} = this.props;
    return (
          <div className="container">
            <div>
              <span><Link to="/">Home</Link></span>
              <span><Link to="/user/1">User</Link></span>
              <span><Link to="/foo">Foo</Link></span>
              <span><Link to="/bar">Bar</Link></span>
            </div>
            {routes.map((route, i) => (
              <MatchWithSubRoutes key={i} {...route} />
              ))}
            <Footer />
          </div>
    );
  }
}
