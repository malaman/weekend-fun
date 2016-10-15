import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";

import {Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, HelpBlock, FormControl} from "react-bootstrap";
import SaveMessage from "./SaveMessage";

class NewPost extends Component {
  static propTypes = {
    saveStatus: PropTypes.object.isRequired,
    createPost: PropTypes.func.isRequired,
    clearSaveStatus: PropTypes.func.isRequired
  };

  state = {
    title: "",
    body: "",
    titleHelpMessage: "",
    bodyHelpMessage: "",
  };

  handleCreateClick = this.handleCreateClick.bind(this);

  getErrorMessage(prop) {
    return `${prop} field could not be empty.`
  }

  handleCreateClick() {
    const title = ReactDOM.findDOMNode(this.refs.posttitle).value || "";
    const body = ReactDOM.findDOMNode(this.refs.postBody).value || "";
    const titleHelpMessage = title === "" ? this.getErrorMessage("title"): "";
    const bodyHelpMessage = body === "" ? this.getErrorMessage("Body"): "";
    this.setState({title, body, titleHelpMessage, bodyHelpMessage});
    if (titleHelpMessage.length == 0 && bodyHelpMessage.length === 0) {
      this.setState({saveStatus: {isSaved: true, isFailed: false}});
      this.props.createPost({title, body});
    }
  }

  render () {
    const titleValidation = this.state.titleHelpMessage !== "" ? "error" : undefined;
    const bodyValidation = this.state.bodyHelpMessage !== "" ? "error" : undefined;
    return (
      <Grid>
        <Row>
          <h2>Create new post</h2>
          <Panel header = "Post">
            <FormGroup controlId="posttitle" validationState={titleValidation}>
              <ControlLabel>Title</ControlLabel>
              <FormControl ref="posttitle" type="text" />
              <HelpBlock>{this.state.titleHelpMessage}</HelpBlock>
            </FormGroup>
            <FormGroup controlId="postBody" validationState={bodyValidation}>
              <ControlLabel>Body</ControlLabel>
              <FormControl ref="postBody" componentClass="textarea" type="text" />
              <HelpBlock>{this.state.bodyHelpMessage}</HelpBlock>
            </FormGroup>
          </Panel>
          <Col sm={6}>
            <Button style={{marginBottom: 10}} onClick={this.handleCreateClick}>Create</Button>
          </Col>
          <Col sm={6}>
            <SaveMessage saveStatus={this.props.saveStatus} clearCallback={this.props.clearSaveStatus} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default NewPost;
