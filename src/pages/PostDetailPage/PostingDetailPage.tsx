import {
  Box,
  IconButton,
  Typography,
  Avatar,
  Button,
  Stack,
  Container,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import CommonBookCard from '@components/commons/CommonBookCard';
import PostingShareDialog from '@components/PostDetailPage/PostingShareDialog';
import mockPost from '@components/PostDetailPage/mockPosting';
import { mockBooks } from '@components/FeedPage/mockPosts';

interface Posting {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  book?: {
    title: string;
    author: string;
    itemId: number;
    imageUrl: string;
  };
  user: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  isLiked: boolean;
}

const PostingDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Posting | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const currentUserId = 1; // TODO: 실제 로그인 유저 ID로 대체
  const [openShareDialog, setOpenShareDialog] = useState(false);

  // Mock 데이터 생성 > 추후 API 요청 작성
  useEffect(() => {
    setPost(mockPost);
  }, [postId]);

  if (!post) return null;

  return (
    // 포스팅 상세 페이지에서는 기본 레이아웃 뺄 예정
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* 포스팅 헤더 */}
      <Box
        sx={{
          width: '100%',
          position: 'sticky',
          opacity: '0.9',
          top: 0,
          bgcolor: 'white',
          zIndex: 1000,
          borderBottom: '1px solid #eee',
          py: 2,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          {post.title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={() => setOpenShareDialog(true)}>
            <ShareIcon />
          </IconButton>
          {post.userId === currentUserId && (
            <IconButton>
              <EditIcon />
            </IconButton>
          )}
        </Stack>
      </Box>
      {/* 포스팅 정보 */}
      <Stack
        sx={{
          px: 4,
          pt: 3,
          width: {
            xs: '100%',
            md: '60%',
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        {/* 유저 정보 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            mb: 3,
            width: '100%',
            borderBottom: '1px solid #eee',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={post.user.avatarUrl} />
            <Stack>
              <Typography>{post.user.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.createdAt).toISOString().split('T')[0]}
              </Typography>
            </Stack>
          </Stack>
          {post.userId !== currentUserId && (
            <Button variant="outlined" size="small">
              팔로우
            </Button>
          )}
        </Box>
        {/* 책 정보 */}
        {post.book && (
          <CommonBookCard
            image={mockBooks[0].imageUrl}
            title={post.book?.title}
            author={post.book?.author}
            sx={{ width: '100%', justifyContent: 'center' }}
          />
        )}

        {/* 포스팅 내용 */}
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {parse(post.content)}
        </Typography>
      </Stack>
      {/* 추후 해당 사용자의 다른 글 표시 */}
      {/* 추후 같은 책에 대한 다른 포스팅 */}
      <PostingShareDialog
        open={openShareDialog}
        handleClose={setOpenShareDialog}
      />
    </Container>
  );
};

export default PostingDetailPage;
