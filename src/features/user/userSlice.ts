import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KakaoUserInfo } from '@features/SNSLogin/api/Kakaoapi';

export interface UserState {
  userInfo: KakaoUserInfo | null;
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
    loginSuccess: (state, action: PayloadAction<KakaoUserInfo>) => {
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
