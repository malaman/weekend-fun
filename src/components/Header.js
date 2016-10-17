import React, {PropTypes} from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router';

class Header extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    name: PropTypes.string
  };

  getUsername() {
    return (
      <span>
        <Glyphicon glyph='user' />
        {` ${this.props.username}`}
      </span>
    );
  }

  getUserMenu() {
    if (true) {
      return (
        <Navbar.Collapse style={{paddingRight: 0}}>
          <Nav pullRight style={{marginRight: 20}}>
            <NavDropdown title={this.getUsername()} id='usermenu'>
              <MenuItem href='/logout'>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      );
    }
  }

  render() {
    const str = 'Personal space';
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/user'>Personal Cabinet ({this.props.name})</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.getUserMenu()}
      </Navbar>
    );
  }
}

export default Header;
