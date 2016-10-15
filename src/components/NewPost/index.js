import React, {Component, PropTypes} from 'react';
import {Grid, Row, Panel, Button, FormGroup, ControlLabel, HelpBlock, FormControl} from 'react-bootstrap';
import ReactDOM from 'react-dom';

class NewPost extends Component {
  state = {
    topic: '',
    body: '',
    topicHelpMessage: '',
    bodyHelpMessage: ''
  };

  handleCreateClick = this.handleCreateClick.bind(this);

  getErrorMessage(prop) {
    return `${prop} field could not be empty.`
  }

  handleCreateClick() {
    const topic = ReactDOM.findDOMNode(this.refs.postTopic).value || '';
    const body = ReactDOM.findDOMNode(this.refs.postBody).value || '';
    const topicHelpMessage = topic === '' ? this.getErrorMessage('Topic'): '';
    const bodyHelpMessage = body === '' ? this.getErrorMessage('Body'): '';
    this.setState({topic, body, topicHelpMessage, bodyHelpMessage});
  }

  render () {
    const topicValidation = this.state.topicHelpMessage !== '' ? 'error' : undefined;
    const bodyValidation = this.state.bodyHelpMessage !== '' ? 'error' : undefined;
    return (
      <Grid>
        <Row>
          <h2>Create new post</h2>
          <Panel header = "Post">
            <FormGroup controlId="postTopic" validationState={topicValidation}>
              <ControlLabel>Topic</ControlLabel>
              <FormControl ref='postTopic' type="text" />
              <HelpBlock>{this.state.topicHelpMessage}</HelpBlock>
            </FormGroup>
            <FormGroup controlId="postBody" validationState={bodyValidation}>
              <ControlLabel>Body</ControlLabel>
              <FormControl ref='postBody' componentClass="textarea" type="text" />
              <HelpBlock>{this.state.bodyHelpMessage}</HelpBlock>
            </FormGroup>
            <Button onClick={this.handleCreateClick}>Create</Button>
          </Panel>
        </Row>
      </Grid>
    );
  }
}

export default NewPost;
