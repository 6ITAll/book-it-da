import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FollowListUser } from '@components/MyPage/types';

export interface FollowListState {
  users: FollowListUser[]; // 팔로워 또는 팔로잉 목록
  hasMore: boolean; // 더 가져올 데이터가 있는지 여부
  page: number; // 현재 페이지 번호
}

const initialState: FollowListState = {
  users: [],
  hasMore: true,
  page: 1,
};

const followListSlice = createSlice({
  name: 'followList',
  initialState,
  reducers: {
    // 새로운 사용자 목록 추가 (중복 제거)
    setUsers(state, action: PayloadAction<FollowListUser[]>) {
      const newUsers = action.payload.filter(
        (newUser) =>
          !state.users.some((user) => user.userId === newUser.userId),
      );
      state.users = [...state.users, ...newUsers];
    },
    // 목록 초기화
    clearUsers(state) {
      state.users = [];
      state.hasMore = true;
      state.page = 1;
    },
    // 더 가져올 데이터가 있는지 설정
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },
    // 현재 페이지 설정
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    // 특정 사용자의 팔로우 상태 토글
    toggleFollowStatus(state, action: PayloadAction<string>) {
      const user = state.users.find((u) => u.userId === action.payload);
      if (user) {
        user.isFollowing = !user.isFollowing;
      }
    },
  },
});

export const { setUsers, clearUsers, setHasMore, setPage, toggleFollowStatus } =
  followListSlice.actions;

export default followListSlice.reducer;
