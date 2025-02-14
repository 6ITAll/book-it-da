import { useCallback, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
  Box,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import {
  useFetchFollowersQuery,
  useFetchFollowingsQuery,
} from '@features/MyPage/api/followListApi';
import { useToggleFollowMutation } from '@features/commons/followApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { supabase } from '@utils/supabaseClient';
import {
  clearUsers,
  setHasMore,
  setPage,
  setUsers,
  toggleFollowStatus,
} from '@features/MyPage/slice/followListSlice';
import { FollowListUser } from './types';

interface FollowListProps {
  setOpen: (open: boolean) => void;
  type: 'followers' | 'followings';
  userId: string;
  onRefetch: () => void;
}

const FollowList = ({ setOpen, type, userId, onRefetch }: FollowListProps) => {
  const navigate = useNavigate();
  const [toggleFollow] = useToggleFollowMutation();
  const dispatch = useDispatch();

  const { users, hasMore, page } = useSelector(
    (state: RootState) => state.followList,
  );

  const currentUserId = useSelector(
    (state: RootState) => state.user.userInfo?.id,
  );

  const followersResult = useFetchFollowersQuery({ userId, page });
  const followingsResult = useFetchFollowingsQuery({ userId, page });

  const fetchedData =
    type === 'followers' ? followersResult.data : followingsResult.data;
  const isFetching =
    type === 'followers'
      ? followersResult.isFetching
      : followingsResult.isFetching;

  // 초기화
  useEffect(() => {
    dispatch(clearUsers());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
  }, [type, userId, dispatch]);

  // 데이터 업데이트
  useEffect(() => {
    if (fetchedData && currentUserId) {
      const checkFollowStatus = async () => {
        try {
          const { data: followData, error } = await supabase
            .from('user_follow')
            .select('following_id')
            .eq('follower_id', currentUserId);

          if (error) throw error;

          const followingIds = followData.map((item) => item.following_id);

          const updatedData: FollowListUser[] = fetchedData.map((user) => ({
            id: user.id,
            username: user.username || user.id,
            name: user.name || user.username || user.id,
            avatarUrl: user.avatarUrl || '',
            isFollowing: followingIds.includes(user.id),
          }));

          dispatch(setUsers(updatedData));
          dispatch(setHasMore(fetchedData.length >= 5));
        } catch (error) {
          console.error('Failed to check follow status:', error);
        }
      };

      checkFollowStatus();
    }
  }, [fetchedData, currentUserId, dispatch]);

  // 팔로우/언팔로우 토글 함수
  const handleToggleFollow = async (targetUserId: string) => {
    try {
      await toggleFollow(targetUserId);
      dispatch(toggleFollowStatus(targetUserId)); // Redux 상태 업데이트
      if (currentUserId === userId) {
        onRefetch();
      }
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    }
  };

  const handleUserClick = (username: string) => {
    navigate(`/my-page/${username}`);
    setOpen(false);
  };

  const fetchMoreData = useCallback(() => {
    if (!isFetching && hasMore) {
      dispatch(setPage(page + 1)); // 페이지 증가
    }
  }, [isFetching, hasMore, page, dispatch]);

  return (
    <Box
      id="FollowListBox"
      sx={{ height: '250px', overflow: 'auto', position: 'relative' }}
    >
      <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Typography>Loading...</Typography>}
        scrollableTarget="FollowListBox"
      >
        <List>
          {users.map(({ id, username, avatarUrl, isFollowing }) => (
            <ListItem key={id} sx={{ cursor: 'pointer' }}>
              <ListItemAvatar onClick={() => handleUserClick(username)}>
                <Avatar src={avatarUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={username}
                onClick={() => handleUserClick(username)}
              />
              {currentUserId !== id && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleToggleFollow(id)}
                >
                  {isFollowing ? '언팔로우' : '팔로우'}
                </Button>
              )}
            </ListItem>
          ))}
          {isFetching && <Typography>Loading...</Typography>}
        </List>
      </InfiniteScroll>
    </Box>
  );
};

export default FollowList;
