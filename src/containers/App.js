import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Footer from '../components/Footer';
import {MatchWithSubRoutes} from '../routes';

export default class App extends Component {
  render() {
    const { counter, actions, children, routes} = this.props;
    console.log('this.props', this.props);
    return (
      <div className="main-app-container">
        <div className="main-app-nav">
          <div id="main-app-title">Simple Redux Boilerplate</div>
          <div>
            <span><Link to="/">Home</Link></span>
            <span><Link to="/foo">Foo</Link></span>
            <span><Link to="/bar">Bar</Link></span>
          </div>
        </div>
          <div>
              {routes.map((route, i) => (
              <MatchWithSubRoutes key={i} {...route} />
              ))}
          </div>
          <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};
