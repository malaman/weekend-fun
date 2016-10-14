import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CounterActions from '../actions/CounterActions';
import * as UserActions from '../actions/UserActions';

export class Counter extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleIncrement() {
    this.props.actions.increment();
  }

  handleDecrement() {
    this.props.actions.decrement();
  }

  componentDidMount() {
    this.props.userActions.getPosts();
  }

  render() {
    return (
      <div className="counter-container">
        <div className="counter-num-label">{this.props.counter}</div>
        <div className="counter-even-label">{this.props.counter % 2 === 0 ? 'even' : 'odd'}</div>
        <br />
        <div className="counter-buttons">
          <button onClick={() => {this.handleDecrement();}}>-</button>
          <button onClick={() => {this.handleIncrement();}}>+</button>
        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CounterActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
