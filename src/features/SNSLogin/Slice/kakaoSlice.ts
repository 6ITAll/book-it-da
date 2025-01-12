import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserInfoType {
  userId: string;
  connected_at: string;
  properties: {
    userName: string;
    avatarUrl: string;
  };
  kakao_account: {
    profile_needs_agreement?: boolean;
    profile?: {
      userName: string;
      avatarUrl: string;
    };
    email?: string;
  };
}

interface KakaoState {
  userInfo: UserInfoType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: KakaoState = {
  userInfo: null,
  status: 'idle',
  error: null,
};

export const fetchKakaoUserInfo = createAsyncThunk<UserInfoType, string>(
  'kakao/fetchUserInfo',
  async (accessToken) => {
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    return response.json();
  },
);

const kakaoSlice = createSlice({
  name: 'kakao',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKakaoUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchKakaoUserInfo.fulfilled,
        (state, action: PayloadAction<UserInfoType>) => {
          state.status = 'succeeded';
          state.userInfo = action.payload;
        },
      )
      .addCase(fetchKakaoUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default kakaoSlice.reducer;
