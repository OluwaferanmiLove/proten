import {createSlice} from '@reduxjs/toolkit';
// import {User} from '../../types';
import {revertAll} from '../sharedAction';
import {LoginResponse} from './Auth';

interface initialStateType {
  isUserOnboarded: boolean;
  isAuthenticated: boolean;
  user: LoginResponse;
  token: string;
}

const initialState: initialStateType = {
  isUserOnboarded: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => builder.addCase(revertAll, () => initialState),
  reducers: {
    userOnboarded: (state, action) => {
      state.isUserOnboarded = action.payload;
    },

    userAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {userOnboarded, userAuthenticated, setToken, setUser} =
  authSlice.actions;

export default authSlice.reducer;
