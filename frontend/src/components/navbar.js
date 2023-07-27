import React, { useState } from 'react';
import {
  Button
} from 'reactstrap';
import COLORS from '../constants/theme';

const NavBar = ({setSettingsOpen}) => {
  const handleSettings = () => {
    setSettingsOpen(true)
  }

  return (
    <div
      style={{
        backgroundColor: COLORS.PRIMARY,
        height: '60px',
        width: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: '100',
      }}
    >
      <div>
        <a
          href="#"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Logo
        </a>
      </div>
      <div>
        <Button
          style={{
            color: 'white',
            textDecoration: 'none',
            marginRight: '20px',
            backgroundColor: COLORS.PRIMARY,
            border: 0
          }}
          onClick={handleSettings}
        >
          Settings
        </Button>
      </div>
    </div>
  )
}

export default NavBar