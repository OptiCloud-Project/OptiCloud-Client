import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import logo from '../../assets/OptiCloud_Logo.png';
import UserInHeader from './UserInHeader/UserInHeader.jsx';

import {
  NavAppBar,
  NavButton,
  LogoStyle,
  LogoContainer,
  LineStyle
} from './Header.style.js';

const pages = ['Dashboard'];

function Header() {
  const handleCloseNavMenu = () => {
    // Handler for nav menu
  };

  return (
    <>
      <NavAppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LogoContainer>
              <LogoStyle src={logo} alt="logo" />
            </LogoContainer>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <NavButton
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  {page}
                </NavButton>
              ))}
            </Box>
            <UserInHeader></UserInHeader>
          </Toolbar>
        </Container>
        <LineStyle>
          <svg height="2">
            <line x1="0" y1="1" x2="100%" y2="1" />
          </svg>
        </LineStyle>
      </NavAppBar>

    </>
  );
}
export default Header;
