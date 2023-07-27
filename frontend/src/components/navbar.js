import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Row,
} from 'reactstrap';
import COLORS from '../constants/theme';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{height: 60, width: "100%", backgroundColor: COLORS.PRIMARY, position: "fixed", zIndex: 100}}>
      
    </div>
  )
}

export default NavBar