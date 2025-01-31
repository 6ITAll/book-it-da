import { useState } from 'react';
import PostCard from '@components/commons/PostCard';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import { Box, Typography, Button, Checkbox, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BookDetailPost } from '@shared/types/type';

interface PostMoreTemplateProps {
  totalPosts?: number;
  posts: BookDetailPost[];
  hasMore: boolean;
  fetchMoreData: () => void;
}

const PostMoreTemplate = ({
  totalPosts,
  posts,
  hasMore,
  fetchMoreData,
}: PostMoreTemplateProps) => {
  const mockUser = { id: '1' };
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const handleDeleteModeToggle = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedPosts([]);
  };

  const handlePostSelect = (index: number) => {
    setSelectedPosts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleDeleteSelected = () => {
    // 여기에 실제 삭제 로직을 구현합니다.
    console.log('Deleting posts:', selectedPosts);
    setIsDeleteMode(false);
    setSelectedPosts([]);
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
          {`포스트 목록 (${totalPosts || 0}개)`}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            startIcon={<DeleteIcon />}
            onClick={handleDeleteModeToggle}
            color={isDeleteMode ? 'secondary' : 'primary'}
            variant={isDeleteMode ? 'contained' : 'outlined'}
            size="small"
          >
            {isDeleteMode ? '취소' : '삭제'}
          </Button>
          {isDeleteMode && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteSelected}
              disabled={selectedPosts.length === 0}
            >
              선택 삭제 ({selectedPosts.length})
            </Button>
          )}
        </Stack>
      </Stack>

      <InfiniteScrollComponent
        items={posts}
        hasMore={hasMore}
        fetchMore={fetchMoreData}
        gridSize={{ xs: 12, md: 12 }}
        renderItem={(post, index) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}
          >
            {isDeleteMode && (
              <Checkbox
                checked={selectedPosts.includes(index)}
                onChange={() => handlePostSelect(index)}
                sx={{ padding: '4px', marginRight: '8px' }}
              />
            )}
            <Box sx={{ flexGrow: 1 }}>
              <PostCard
                postId="postId"
                title={post.title}
                content="내용"
                cover="커버"
                user={mockUser}
              />
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default PostMoreTemplate;
