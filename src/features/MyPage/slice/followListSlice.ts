import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FollowListUser } from '@components/MyPage/types';

export interface FollowListState {
  users: FollowListUser[];
  hasMore: boolean;
  page: number;
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
    setUsers(state, action: PayloadAction<FollowListUser[]>) {
      const newUsers = action.payload.filter(
        (newUser) =>
          !state.users.some((user) => user.userId === newUser.userId),
      );
      state.users = [...state.users, ...newUsers];
    },
    clearUsers(state) {
      state.users = [];
      state.hasMore = true;
      state.page = 1;
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
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
