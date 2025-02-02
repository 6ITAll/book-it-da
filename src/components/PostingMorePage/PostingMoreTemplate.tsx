import { useState } from 'react';
import PostCard from '@components/commons/PostCard';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import { Box, Typography, Button, Checkbox, Stack } from '@mui/material';
import { Posting } from '@components/MyPage/types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useDeletePostsMutation } from '@features/MyPage/api/userFeedsApi';
import { deletePostings } from '@features/MyPage/slice/userPostingMoreSlice';

interface PostingMoreTemplateProps {
  totalPostings?: number;
  postings: Posting[];
  hasMore: boolean;
  fetchMoreData: () => void;
  likedPosting?: boolean;
}

const PostingMoreTemplate = ({
  totalPostings,
  postings,
  hasMore,
  fetchMoreData,
  likedPosting = false,
}: PostingMoreTemplateProps) => {
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [selectedPostings, setSelectedPostings] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { username } = useParams<{ username: string }>();
  const currentUsername = useSelector(
    (state: RootState) => state.user.userInfo?.username,
  );
  const [deletePosts] = useDeletePostsMutation();

  const handleDeleteModeToggle = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedPostings([]);
  };

  const handlePostingsSelect = (postId: string) => {
    setSelectedPostings(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // 이미 선택된 경우 제거
          : [...prev, postId], // 선택되지 않은 경우 추가
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await deletePosts(selectedPostings).unwrap(); // 선택된 게시물 삭제

      // Redux 상태에서 삭제된 게시물 제거
      dispatch(deletePostings(selectedPostings));

      setIsDeleteMode(false);
      setSelectedPostings([]);
    } catch (error) {
      console.error('Failed to delete posts:', error);
    }
  };
  return (
    <Box sx={{ padding: '1rem', maxWidth: '1200px', margin: 'auto' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="1rem"
      >
        <Typography variant="h5" fontWeight="bold">
          {`포스트 목록 (${totalPostings || 0}개)`}
        </Typography>
        <Stack direction="row" spacing={2}>
          {currentUsername === username && !likedPosting && (
            <>
              <Button
                onClick={handleDeleteModeToggle}
                color={isDeleteMode ? 'secondary' : 'primary'}
                variant={isDeleteMode ? 'contained' : 'outlined'}
                size="small"
              >
                {isDeleteMode ? '취소' : '편집'}
              </Button>
              {isDeleteMode && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteSelected}
                  disabled={selectedPostings.length === 0}
                >
                  선택 삭제 ({selectedPostings.length})
                </Button>
              )}
            </>
          )}
        </Stack>
      </Stack>

      <InfiniteScrollComponent
        items={postings}
        hasMore={hasMore}
        fetchMore={fetchMoreData}
        gridSize={{ xs: 12, md: 12 }}
        renderItem={(posting) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}
          >
            {isDeleteMode && (
              <Checkbox
                checked={selectedPostings.includes(posting.post_id)}
                onChange={() => handlePostingsSelect(posting.post_id)}
                sx={{ padding: '4px', marginRight: '8px' }}
              />
            )}
            <Box sx={{ flexGrow: 1 }}>
              <PostCard
                postId={posting.post_id}
                title={posting.title}
                content={posting.content}
                isbn={posting.book.isbn}
                user={posting.user}
              />
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default PostingMoreTemplate;
