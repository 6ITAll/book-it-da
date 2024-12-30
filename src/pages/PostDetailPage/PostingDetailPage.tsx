import { Stack, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostingShareDialog from '@components/PostDetailPage/PostingShareDialog/PostingShareDialog';
import mockPost from '@components/PostDetailPage/mockPosting';
import PostingUserInfo from '@components/PostDetailPage/PostingUserInfo';
import PostingContent from '@components/PostDetailPage/PostingContent';
import PostingHeader from '@components/PostDetailPage/PostingHeader';
import OtherPostingGrid from '@components/PostDetailPage/OtherPostingGrid';
import {
  mockBookOtherPosting,
  mockUserOtherPosting,
} from '@components/PostDetailPage/mockOtherPosting';

// 추후 타입 정리 필요
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
        px: '0',
        backgroundColor: '#f0f0f0',
        boxSizing: 'border-box',
      }}
    >
      {/* 포스팅 헤더 */}
      <PostingHeader
        title={post.title}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        setOpenShareDialog={setOpenShareDialog}
        userId={post.userId}
        currentUserId={currentUserId}
      />
      {/* 포스팅 정보 */}
      <Stack
        sx={{
          px: 4,
          pt: 3,
          width: {
            xs: '100%',
            md: '50%',
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        {/* 유저 정보 */}
        <PostingUserInfo
          user={post.user}
          createdAt={post.createdAt}
          currentUserId={currentUserId}
        />
        {/* 포스팅 정보 */}
        <PostingContent content={post.content} book={post.book} />
      </Stack>
      <Stack>
        <OtherPostingGrid
          title="이 책의 다른 포스팅"
          posts={mockBookOtherPosting}
        />
        <OtherPostingGrid
          title="사용자의 다른 포스팅"
          posts={mockUserOtherPosting}
        />
      </Stack>
      <PostingShareDialog
        open={openShareDialog}
        handleClose={setOpenShareDialog}
      />
    </Container>
  );
};

export default PostingDetailPage;
