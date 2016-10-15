import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Match }from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';

import * as UserActions from '../../actions/UserActions';
import getCookie from '../../helpers/getCookie';
import Posts from '../../components/Posts';
import AccountData from '../../components/AccountData';
import NewPost from '../../components/NewPost';

class User extends Component {
  componentDidMount() {
    const userId = getCookie('userId');
    if (userId) {
      this.props.actions.getPosts(userId);
      this.props.actions.getUserIfo(userId);
    }
  }

  render() {
    const { pathname, actions, posts, info, location } = this.props;
    return (
      <div className="counter-container">
        <Nav bsStyle="tabs" activeKey={location.pathname} onSelect={this.handleSelect}>
          <NavItem eventKey="/user">
            <Link style={{ padding: 10 }} to={`${pathname}`}>Posts</Link>
          </NavItem>
          <NavItem eventKey={`${pathname}/info`}>
            <Link style={{ padding: 10 }} to={`${pathname}/info`}>Info</Link>
          </NavItem>
          <NavItem eventKey={`${pathname}/newPost`}>
            <Link style={{ padding: 10 }} to={`${pathname}/newPost`}>New Post</Link>
          </NavItem>
        </Nav>
        <Match
          pattern={pathname}
          exactly
          component={() => <Posts posts={posts} togglePost={actions.togglePostView} />}
        />
        <Match
          pattern={`${pathname}/info`}
          component={() => <AccountData info={info} />}
        />
        <Match
          pattern={`${pathname}/newPost`}
          component={() => <NewPost />}
        />
      </div>
    );
  }
}

User.propTypes = {
  actions: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  info: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.user.posts,
    info: state.user.info
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);



