import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../api';
/* eslint-disable */

export const loginUser = createAsyncThunk(
  '/login',
  async (userCredentials) => {
    const request = await signIn(userCredentials);

    // eslint-disable-next-line no-console
    console.log('request -----', request);

    return request.data.data;
  },
);

export const signupUser = createAsyncThunk(
  '/signup',
  async (user) => {
    const request = await signUp(user);

    return request.data;
  },
);

export const logoutUser = createAsyncThunk(
  '/logout',
  async () => {
    // eslint-disable-next-line no-console
    console.log('logoutUser -----', logoutUser);

    return null;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {

        console.log('action.payload-----', action.payload);

        if (!action.payload.success) {
          state.loading = false;
          state.user = null;
          state.error = action.payload.message;
        } else {
          state.loading = false;
          state.user = action.payload.data;
          state.error = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        // eslint-disable-next-line no-console
        console.log('action.error.message', action.error?.message);

        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access denied! Invalid credentials';
        } else {
          state.error = action.error?.message;
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error?.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error?.message;
      });
  },
});

export default userSlice.reducer;
