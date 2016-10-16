import React, {Component, PropTypes} from "react";
import { connect } from 'react-redux';
import { togglePost } from '../../actions/UserActions';
import {Table, Panel} from "react-bootstrap";
import classnames from "classnames";

const centredCellStyle = {textAlign: "center"};

function Comment({name, email, body}) {
  return (
    <Panel header={<span>{`${name} `}(<a href={`mailto:${email}`}>{email}</a>)</span>}>
      {body}
    </Panel>
  )
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    togglePost: PropTypes.func.isRequired
  };

  handlePostClick(id) {
    return () => this.props.togglePost(id);
  }

  getPost(post) {
    const chevronClass = classnames("glyphicon", {
      "glyphicon-chevron-up": post.expanded,
      "glyphicon-chevron-down": !post.expanded
    });
    return (
      <tr key={post.id} style={{cursor: "pointer"}} onClick={this.handlePostClick(post.id)}>
        <td style={centredCellStyle}>
          <span className={chevronClass}></span>
        </td>
        <td style={centredCellStyle}>{post.id}</td>
        <td>{post.title}</td>
        <th style={centredCellStyle}>{post.totalComments}</th>
      </tr>
    );
  }

  getComments(post) {
    if (post.expanded) {
      return (
        <tr key={`${post.id}:comments`}>
          <td>
          </td>
          <td>
          </td>
          <td>
            <Panel bsStyle="success" header="Post body">
              {post.body}
            </Panel>
            <Panel bsStyle="success" header="Comments">
              {post.comments.map((comment, i)=> <Comment key={i} {...comment} />)}
            </Panel>
          </td>
          <td>
          </td>
        </tr>
      )
    }
  }

  getPosts() {
    return this.props.posts.map(post => [this.getPost(post), this.getComments(post)]);
  }

  getTable() {
    if (this.props.posts.length) {
      return (
        <Table striped bordered hover>
          <thead>
          <tr>
            <th style={centredCellStyle}></th>
            <th style={centredCellStyle}>#</th>
            <th className='col-sm-8 col-md-10'>Title</th>
            <th style={centredCellStyle}>Comments</th>
          </tr>
          </thead>
          <tbody>
          {this.getPosts()}
          </tbody>
        </Table>
      )
    }
    return <Panel style={{height: 300}} />
  }

  render () {
    return (
      <div>
        <h2>Total Number of Posts: {this.props.posts.length} </h2>
        {this.getTable()}
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {posts: state.user.posts};
}

export default connect(
    mapStateToProps,
    {togglePost}
)(Posts);
