import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoggedIn: boolean;
  checkedPassword: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  checkedPassword: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
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
