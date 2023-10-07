import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, GlobalStyles, Toolbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/UserSlice';

const defaultTheme = createTheme();

type State = {
  user: {
    isLoading: boolean,
    error: string,
    user: {
      firstName: string,
      lastName: string,
    },
  }
};

function Header() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const { user } = useSelector((state: State) => state.user);

  // eslint-disable-next-line no-console
  console.log('user', user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/signin');
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          {user && (
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
          )}
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/contact"
              sx={{ my: 1, mx: 1.5 }}
            >
              Contact
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/about"
              sx={{ my: 1, mx: 1.5 }}
            >
              About
            </Link>
          </nav>
          {user ? (
            <Button onClick={handleLogout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Log out
            </Button>
          ) : (
            <Button href="/signin" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
