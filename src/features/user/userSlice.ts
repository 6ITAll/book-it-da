import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  isSocialLogin: boolean;
}

export interface UserState {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  checkedPassword: boolean;
  autoLogin: boolean;
  token: string | null;
}

const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
  checkedPassword: false,
  autoLogin: false,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.autoLogin = false;
      state.token = null;
      state.checkedPassword = false;
    },
    setAvatarUrl: (state, action: PayloadAction<string>) => {
      if (state.userInfo) {
        state.userInfo.avatarUrl = action.payload;
      }
    },
    setCheckedPassword(state, action: PayloadAction<boolean>) {
      state.checkedPassword = action.payload;
    },
    setAutoLogin(state, action: PayloadAction<boolean>) {
      state.autoLogin = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  setAvatarUrl,
  setCheckedPassword,
  setAutoLogin,
  setToken,
} = userSlice.actions;
export default userSlice.reducer;
