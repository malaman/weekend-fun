import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/UserActions';

import {Nav, NavItem} from 'react-bootstrap';
import Posts from '../../components/Posts';
import AccountData from '../../components/AccountData';

class User extends Component {
  state = {
    activeTab: "1"
  };

  handleSelect = this.handleSelect.bind(this);

  componentDidMount() {
    const userId = this.props.params.id;
    if (userId) {
      this.props.actions.getPosts(userId);
      this.props.actions.getUserIfo(userId);
    }
  }

  handleSelect(tab) {
    this.setState({activeTab: tab});
  }

  getContent() {
    if (this.state.activeTab === "1") {
      return (
        <Posts posts={this.props.posts} togglePost={this.props.actions.togglePostView} />
      );
    }
    return <AccountData info={this.props.info} />;
  }

  render() {
    return (
      <div className="counter-container">
        <Nav bsStyle="tabs" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <NavItem eventKey="1">Posts</NavItem>
          <NavItem eventKey="2">Info</NavItem>
        </Nav>
        <div>
          {this.getContent()}
        </div>
      </div>
    );
  }
}

User.propTypes = {
  actions: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  info: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
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


