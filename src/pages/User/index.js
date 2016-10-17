import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import { getPosts, getUserInfo } from '../../actions/UserActions';

import getCookie from '../../helpers/getCookie';
import { MatchWithSubRoutes } from '../../routes';

class User extends Component {
  handleNavSelect = this.handleNavSelect.bind(this);

  componentDidMount() {
    // read 'userId' cookie and fire xhr call to get posts and user info
    const userId = getCookie('userId');
    if (userId) {
      this.props.getPosts(userId);
      this.props.getUserInfo(userId);
    }
  }

  handleNavSelect(pathname) {
    return () => this.context.router.transitionTo(pathname);
  }

  render() {
    const { pathname, location, routes } = this.props;
    return (
      <div className='counter-container'>
        <Nav bsStyle='tabs' activeKey={location.pathname}>
          <NavItem eventKey='/user' onClick={this.handleNavSelect(pathname)}>
            Posts
          </NavItem>
          <NavItem eventKey={`${pathname}/info`} onClick={this.handleNavSelect(`${pathname}/info`)}>
            Info
          </NavItem>
          <NavItem eventKey={`${pathname}/newPost`} onClick={this.handleNavSelect(`${pathname}/newPost`)}>
            New Post
          </NavItem>
        </Nav>
          {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
      </div>
    );
  }
}

User.propTypes = {
  routes: PropTypes.array,
  params: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired
};

User.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  {getPosts, getUserInfo}
)(User);
