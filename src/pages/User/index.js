import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link }from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';

import { getPosts, getUserInfo } from '../../actions/UserActions';

import getCookie from '../../helpers/getCookie';
import { MatchWithSubRoutes } from '../../routes';

class User extends Component {
  componentDidMount() {
    const userId = getCookie('userId');
    if (userId) {
      this.props.getPosts(userId);
      this.props.getUserInfo(userId);
    }
  }

  render() {
    const { pathname, location, routes } = this.props;
    const linkStyle = { padding: 10 };
    return (
      <div className="counter-container">
        <Nav bsStyle="tabs" activeKey={location.pathname} onSelect={this.handleSelect}>
          <NavItem eventKey="/user">
            <Link style={linkStyle} to={`${pathname}`}>Posts</Link>
          </NavItem>
          <NavItem eventKey={`${pathname}/info`}>
            <Link style={linkStyle} to={`${pathname}/info`}>Info</Link>
          </NavItem>
          <NavItem eventKey={`${pathname}/newPost`}>
            <Link style={linkStyle} to={`${pathname}/newPost`}>New Post</Link>
          </NavItem>
        </Nav>
          {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
      </div>
    );
  }
}

User.propTypes = {
  params: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {getPosts, getUserInfo}
)(User);
