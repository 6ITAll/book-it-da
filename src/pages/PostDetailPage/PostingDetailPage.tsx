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
import { mockBooks } from '@components/FeedPage/mockPosts';
import CommonBookCard from '@components/commons/CommonBookCard';
import PostingShareDialog from '@components/PostDetailPage/PostingShareDialog';

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
    setPost({
      id: 1,
      title: '포스팅 제목',
      content: `
      <p><strong>이 책을 처음 접했을 때의 느낌은 아직도 생생합니다.</strong></p>
      <h2>인상 깊었던 구절</h2>
      <blockquote>"가장 행복한 사람은 다른 사람의 행복을 위해 무언가를 하는 사람이다." - p.123</blockquote>
      <h2>책의 매력적인 부분</h2>
      <p>작가는 섬세한 묘사로 독자들을 이야기 속으로 끌어들입니다. 특히 다음과 같은 장면들이 인상적이었습니다:</p>
      <ul>
        <li>주인공의 내적 성장 과정</li>
        <li>갈등 해결 방식의 현실성</li>
        <li>감정 선의 자연스러운 흐름</li>
      </ul>
      <h2>개인적인 소감</h2>
      <p><span style="color: rgb(102, 102, 102);">이 책은 단순한 소설이 아닌, 삶의 진정한 의미를 되새기게 하는 거울과도 같았습니다.</span></p>
      <p><em>이 책을 읽으면서 느낀 감동을 오래도록 간직하고 싶습니다.</em></p>
    `,
      userId: 2,
      createdAt: '2024-01-15T09:00:00.000Z',
      book: {
        title: '금각사',
        author: '미시마 유키오',
        itemId: 107413605,
        imageUrl: mockBooks[0].imageUrl,
      },
      user: {
        id: 2,
        name: 'John Doe',
        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
      },
      isLiked: false,
    });
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
