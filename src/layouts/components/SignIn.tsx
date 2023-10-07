import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../store/UserSlice';
/* eslint-disable */

const defaultTheme = createTheme();

type FormValues = {
    email: string,
    password: string,
};

type State = {
    user: {
        isLoading: boolean,
        error: string,
        user: {},
    }
};

export const SignIn: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: State) => state.user);

  const handleSubmit = (values: FormValues) => {
    const userCredentials = {
      email: values.email,
      password: values.password,
    };

    // @ts-ignore
      dispatch(loginUser(userCredentials)).then(result => {
      if (result.payload) {
        navigate('/');
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit(values);
              console.log('values', values);
            }}

            validationSchema={Yup.object().shape({
              password: Yup.string()
                  .min(6, 'Too Short!')
                  .max(50, 'Too Long!')
                  .required('Password is required'),
              email: Yup.string().email('Invalid email').required('Email is required'),
            })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
                <form onSubmit={handleSubmit}>
                  <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box>
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          error={!!(errors.email && touched.email)}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.email && touched.email) && errors.email}
                      />
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          error={!!(errors.password && touched.password)}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.password && touched.password) && errors.password}
                      />

                      {error && (
                          <Box mt={1}>
                            <Alert severity="error">{error}</Alert>
                          </Box>
                      )}

                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                      >
                        {isLoading ? <CircularProgress color="inherit" /> : 'Sign In'}
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Link href="/signup" variant="body2">
                            Don&apos;t have an account? Sign Up
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </form>
            );
          }}
        </Formik>
      </Container>
    </ThemeProvider>
  );
}
