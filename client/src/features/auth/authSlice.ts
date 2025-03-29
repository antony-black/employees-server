import { User } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../app/services/auth';
import { RootState } from "../../app/store";

type TUser = (User & { accessToken: string }) | null;

interface IinitialState {
  user: TUser;
  isAuthenticated: boolean;
}

const initialState: IinitialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.registration.matchFulfilled, (state, action) => {
        state.user = action.payload;
        // state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.currentUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const {logout} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
