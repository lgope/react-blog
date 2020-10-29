import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Logout from './auth/Logout.component';
import { connect } from 'react-redux';

const NavbarComponent = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className='app-navbar'>
      <Navbar expand='md'>
        <Container>
          <NavbarBrand href='/'>Blog</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar></Nav>
            <NavbarText>
              <Nav className='mr-auto' navbar>
                {auth.isAuthenticated ? (
                  <>
                    <NavItem className='p-2'>
                      <Link to='/'>Wellcome {auth.user && auth.user[0].name}</Link>
                    </NavItem>

                    <NavItem className='p-2'>
                      <Link to='/home'>Home</Link>
                    </NavItem>

                    <NavItem className='p-2'>
                      <Link to='/tags'>Tags</Link>
                    </NavItem>

                    <NavItem className='p-2'>
                      <Link to='/categories'>Categories</Link>
                    </NavItem>

                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        More
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          {' '}
                          <Link to='/profile'>Profile</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Logout />
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </>
                ) : (
                  <NavItem>
                    <Link to='/'>Login</Link>
                  </NavItem>
                )}
              </Nav>
            </NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(NavbarComponent);
