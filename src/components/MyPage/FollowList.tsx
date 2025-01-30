import { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import {
  useFetchFollowersQuery,
  useFetchFollowingsQuery,
} from '@features/MyPage/api/followListApi';
import { useToggleFollowMutation } from '@features/commons/followApi';
import { FollowListUser } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { supabase } from '@utils/supabaseClient';

interface FollowListProps {
  setOpen: (open: boolean) => void;
  type: 'followers' | 'followings';
  userId: string;
  onRefetch: () => void;
}

const FollowList = ({ setOpen, type, userId, onRefetch }: FollowListProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<FollowListUser[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [toggleFollow] = useToggleFollowMutation();

  const currentUserId = useSelector(
    (state: RootState) => state.user.userInfo?.id,
  );

  // RTK Query를 사용하여 데이터 가져오기
  const followersResult = useFetchFollowersQuery({ userId, page });
  const followingsResult = useFetchFollowingsQuery({ userId, page });

  const fetchedData =
    type === 'followers' ? followersResult.data : followingsResult.data;
  const isFetching =
    type === 'followers'
      ? followersResult.isFetching
      : followingsResult.isFetching;

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

          const updatedData = fetchedData.map((user) => ({
            ...user,
            isFollowing: followingIds.includes(user.userId),
          }));

          setUsers((prevUsers) => [...prevUsers, ...updatedData]);
          if (fetchedData.length < 5) {
            setHasMore(false);
          }
        } catch (error) {
          console.error('Failed to check follow status:', error);
        }
      };

      checkFollowStatus();
    }
  }, [fetchedData, currentUserId]);

  // 팔로우/언팔로우 토글 함수
  const handleToggleFollow = async (targetUserId: string) => {
    try {
      await toggleFollow(targetUserId);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === targetUserId
            ? { ...user, isFollowing: !user.isFollowing }
            : user,
        ),
      );
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

  return (
    <InfiniteScroll
      dataLength={users.length}
      next={() => setPage((prevPage) => prevPage + 1)}
      hasMore={hasMore}
      loader={<Typography>Loading...</Typography>}
    >
      <List>
        {users.map(({ userId, username, avatarUrl, isFollowing }) => (
          <ListItem key={userId} sx={{ cursor: 'pointer' }}>
            <ListItemAvatar onClick={() => handleUserClick(username)}>
              <Avatar src={avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={username}
              onClick={() => handleUserClick(username)}
            />
            {currentUserId !== userId && (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleToggleFollow(userId)}
              >
                {isFollowing ? '언팔로우' : '팔로우'}
              </Button>
            )}
          </ListItem>
        ))}
        {isFetching && <Typography>Loading...</Typography>}
      </List>
    </InfiniteScroll>
  );
};

export default FollowList;
