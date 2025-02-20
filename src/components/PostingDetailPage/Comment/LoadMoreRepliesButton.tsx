import { REPLIES_PER_PAGE } from '@constants/comment';
import { useGetRepliesCountQuery } from '@features/PostDetailPage/api/commentApi';
import { Button } from '@mui/material';

interface LoadMoreRepliesButtonProps {
  parentId: string;
  currentPage: number;
  onLoadMore: (commentId: string) => void;
}

const LoadMoreRepliesButton = ({
  parentId,
  currentPage,
  onLoadMore,
}: LoadMoreRepliesButtonProps) => {
  const { data: repliesCount = 0 } = useGetRepliesCountQuery(
    { parentId },
    { skip: false },
  );

  if (repliesCount <= currentPage * REPLIES_PER_PAGE) return null;

  return (
    <Button
      onClick={() => onLoadMore(parentId)}
      sx={{
        mt: 1,
        color: 'text.secondary',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      답글 {repliesCount - currentPage * REPLIES_PER_PAGE}개 더보기
    </Button>
  );
};

export default LoadMoreRepliesButton;
