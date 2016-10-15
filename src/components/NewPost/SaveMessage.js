import React, {PropTypes} from 'react';
import {Alert} from 'react-bootstrap';

export default class SaveMessage extends React.Component {
  static propTypes = {
    saveStatus: PropTypes.object.isRequired,
    clearCallback: PropTypes.func.isRequired
  };

  getMessage() {
    const { isSaved, isFailed }= this.props.saveStatus;

    if (isSaved || isFailed) {
      const bsStyle = isSaved ? 'success' : 'danger';
      const message = isSaved ? 'Changes are saved successfully!' : 'Error. Changes are not saved!';
      setTimeout(() => this.props.clearCallback(), 3000);
      return (
        <Alert bsStyle={bsStyle}>
          <strong>{message}</strong>
        </Alert>
      );
    }
  }

  render() {
    return (
      <div>
        {this.getMessage()}
      </div>
    );
  }
}
