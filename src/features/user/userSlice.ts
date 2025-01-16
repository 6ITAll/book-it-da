import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id: string;
  email?: string;
  username?: string;
}

export interface UserState {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  checkedPassword: boolean;
}

const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
  checkedPassword: false,
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
    },
    setCheckedPassword(state, action: PayloadAction<boolean>) {
      state.checkedPassword = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, setCheckedPassword } =
  userSlice.actions;
export default userSlice.reducer;
