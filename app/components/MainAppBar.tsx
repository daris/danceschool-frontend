"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {logout, selectAuthUser} from "@/lib/features/auth/authSlice";
import {stringAvatar} from "@/lib/avatar";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";

function MainAppBar() {
  const authUser = useAppSelector(selectAuthUser);
  const dispatch = useDispatch<AppDispatch>();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavClick = (path: string) => {
    router.push(path);
    setAnchorElNav(null);
  }

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    dispatch(logout());
  }

  const router = useRouter()

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            onClick={() => router.push('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DANCE SCHOOL
          </Typography>

          {authUser &&
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <MenuItem onClick={() => handleNavClick('/qr')}>
                  <Typography sx={{ textAlign: 'center' }}>QR Scanner</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleNavClick('/courses')}>
                  <Typography sx={{ textAlign: 'center' }}>Courses</Typography>
                </MenuItem>
              </Menu>
            </Box>
          }
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            onClick={() => router.push('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DANCE SCHOOL
          </Typography>

          {authUser &&
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  onClick={() => handleNavClick('/qr')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  QR Scanner
                </Button>
                <Button
                  onClick={() => handleNavClick('/courses')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Courses
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar {...stringAvatar(`${authUser.firstName} ${authUser.lastName}`)} />&nbsp;
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogoutClick}>
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainAppBar;