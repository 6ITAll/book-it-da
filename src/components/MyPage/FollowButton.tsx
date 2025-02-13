import { Button } from '@mui/material';
import {
  useCheckFollowStatusQuery,
  useToggleFollowMutation,
} from '@features/commons/followApi';

interface FollowButtonProps {
  userId: string;
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const { data, isLoading } = useCheckFollowStatusQuery(userId);
  const [toggleFollow, { isLoading: isToggling }] = useToggleFollowMutation();

  if (isLoading) return <Button disabled>Loading...</Button>;

  const handleClick = async () => {
    await toggleFollow(userId);
  };

  return (
    <Button onClick={handleClick} disabled={isToggling}>
      {data?.isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
