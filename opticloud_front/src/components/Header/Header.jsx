import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import logo from '../../assets/OptiCloud_Logo.png';
import UserInHeader from './UserInHeader/UserInHeader.jsx';
import StorageCostDisplay from '../StorageCost/StorageCostDisplay.jsx';
import AdminLogsModal from '../AdminLogs/AdminLogsModal.jsx';

import {
  NavAppBar,
  NavButton,
  LogoStyle,
  LogoContainer,
  LineStyle
} from './Header.style.js';

const pages = ['Dashboard'];

function Header() {
  const [adminLogsOpen, setAdminLogsOpen] = React.useState(false);

  const handleCloseNavMenu = () => {
    // Handler for nav menu
  };

  return (
    <>
      <NavAppBar>
        <Container maxWidth="100%">
          <Toolbar disableGutters>
            <LogoContainer>
              <LogoStyle src={logo} alt="logo" />
            </LogoContainer>

            {/* Left: Navigation (Dashboard) */}
            <Box sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <NavButton
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    '&:last-child td': { borderBottom: 0 },
                    '&:hover': { backgroundColor: 'rgba(136, 165, 170, 0.3) !important' },
                    cursor: 'pointer'
                  }}
                >
                  {page}
                </NavButton>
              ))}
            </Box>

            {/* Center: Storage cost display */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <StorageCostDisplay />
            </Box>

            {/* Right: Admin logs + User info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => setAdminLogsOpen(true)}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  py: 0.5,
                  px: 1.5,
                  backgroundColor: '#f9a825',
                  color: '#111718',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#f57f17' }
                }}
              >
                Admin logs
              </Button>
              <UserInHeader />
            </Box>
          </Toolbar>
        </Container>
        <LineStyle>
          <svg height="2">
            <line x1="0" y1="1" x2="100%" y2="1" />
          </svg>
        </LineStyle>
      </NavAppBar>

      <AdminLogsModal
        open={adminLogsOpen}
        onClose={() => setAdminLogsOpen(false)}
      />
    </>
  );
}
export default Header;
