import React, {Component, PropTypes} from 'react';
import {Table, Panel} from 'react-bootstrap';

class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  };

  getPosts() {
    if (this.props.posts.length) {
      return (
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Topic</th>
            <th>Comments</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.posts.map(post => (
              <tr key={post.id} style={{cursor: 'pointer'}}>
                <td style={{textAlign: 'center'}}>
                  <span className="glyphicon glyphicon-chevron-up"></span>
                </td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <th></th>
              </tr>
              )
            )
          }
          </tbody>
        </Table>
      )
    }
    return <Panel> No posts is created yet!</Panel>
  }

  render () {
    return (
      <div>
        <h2>Total Number of Posts: {this.props.posts.length} </h2>
        {this.getPosts()}
      </div>
    )
  }
}

export default Posts;
