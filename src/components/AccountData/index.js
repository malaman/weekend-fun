import React, {Component, PropTypes} from 'react';
import {Grid, Row, Panel, Table} from 'react-bootstrap';
// import {Input, Grid, Row, Button, Label, Panel} from 'react-bootstrap/lib';

function InfoItem({label, value}) {
  return (
    <div>
      <span style={{fontWeight: 'bold'}}>{label}: </span>
      <span>{value}</span>
    </div>
  )
}

class AccountData extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired
  };

  render () {
    console.log('this.props', this.props);
    return (
        <Grid className='settings'>
          <Row>
            <h2>Your Account</h2>
            <Panel header='General'>
              <InfoItem label='Name' value={this.props.info.name} />
              <InfoItem label='Username' value={this.props.info.username} />
              <InfoItem label='Email' value={this.props.info.email} />
              <InfoItem label='Phone' value={this.props.info.phone} />
              <InfoItem label='Website' value={this.props.info.website} />
            </Panel>
            <Panel header='Address'>
              <InfoItem label='Street' value={this.props.info.address.street} />
              <InfoItem label='Suite' value={this.props.info.address.suite} />
              <InfoItem label='City' value={this.props.info.address.city} />
              <InfoItem label='Zipcode' value={this.props.info.address.zipcode} />
            </Panel>
            <Panel header='Company'>
              <InfoItem label='Name' value={this.props.info.company.name} />
              <InfoItem label='Businesses' value={this.props.info.company.bs} />

            </Panel>
          </Row>
        </Grid>
    )
  }
}

export default AccountData;