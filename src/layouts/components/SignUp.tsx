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
/* eslint-disable */
import * as Yup from 'yup';
import { Formik } from 'formik';
import { signupUser } from '../../store/UserSlice';

type FormValues = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
};

type State = {
  user: {
    isLoading: boolean,
    error: string,
    user: {},
  }
};

const defaultTheme = createTheme();
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default function SignUp() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state: State) => state.user);

  const handleSubmit = (values: FormValues) => {
    const userValues = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
    };

    dispatch(signupUser(userValues)).then(result => {
      if (!result.payload?.message) {
        navigate('/');
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={{
            email: '', password: '', phoneNumber: '', firstName: '', lastName: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('First name is required'),
            lastName: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Last name is required'),
            phoneNumber: Yup.string()
              .matches(phoneRegExp, 'Phone number is not valid'),
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
              // eslint-disable-next-line no-shadow
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
                    Sign up
                  </Typography>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          error={!!(errors.firstName && touched.firstName)}
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.firstName && touched.firstName) && errors.firstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                          error={!!(errors.lastName && touched.lastName)}
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.lastName && touched.lastName) && errors.lastName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="phoneNumber"
                          label="Phone number"
                          name="phoneNumber"
                          error={!!(errors.phoneNumber && touched.phoneNumber)}
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            (errors.phoneNumber && touched.phoneNumber) && errors.phoneNumber
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          error={!!(errors.email && touched.email)}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.email && touched.email) && errors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          error={!!(errors.password && touched.password)}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.password && touched.password) && errors.password}
                        />
                      </Grid>
                    </Grid>

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
                      {isLoading ? <CircularProgress color="inherit" /> : 'Sign Up'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/signin" variant="body2">
                          Already have an account? Sign in
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
