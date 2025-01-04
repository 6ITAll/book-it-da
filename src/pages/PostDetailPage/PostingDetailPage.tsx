import { Stack, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import URLShareDialog from '@components/commons/URLShareDialog';
import PostingUserInfo from '@components/PostDetailPage/PostingUserInfo';
import PostingContent from '@components/PostDetailPage/PostingContent';
import PostingHeader from '@components/PostDetailPage/PostingHeader';
import OtherPostingGrid from '@components/PostDetailPage/OtherPostingGrid';
import {
  useGetBookOtherPostsQuery,
  useGetCurrentUserQuery,
  useGetPostByIdQuery,
  useGetUserOtherPostsQuery,
} from '@features/PostDetailPage/api/postingApi';

const PostingDetailPage = () => {
  const { postingId } = useParams();
  const { data: post, isLoading, error } = useGetPostByIdQuery(postingId!);
  const { data: bookOtherPosts } = useGetBookOtherPostsQuery(
    post?.book?.itemId ?? 0,
  );
  const { data: userOtherPosts } = useGetUserOtherPostsQuery(
    post?.user.id ?? 0,
  );
  const [isLiked, setIsLiked] = useState(false);
  const { data: currentUser } = useGetCurrentUserQuery();
  const [openShareDialog, setOpenShareDialog] = useState(false);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!post || !currentUser) return null;
  if (!postingId) return <div>잘못된 접근입니다.</div>;

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
        postingId={post.id}
        userId={post.user.id}
        currentUserId={currentUser.id}
        likeCount={post.likeCount}
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
          currentUserId={currentUser.id}
        />
        {/* 포스팅 정보 */}
        <PostingContent content={post.content} book={post.book} />
      </Stack>
      <Stack>
        <OtherPostingGrid
          title="이 책의 다른 포스팅"
          posts={bookOtherPosts ?? []}
        />
        <OtherPostingGrid
          title="사용자의 다른 포스팅"
          posts={userOtherPosts ?? []}
        />
      </Stack>
      <URLShareDialog open={openShareDialog} handleClose={setOpenShareDialog} />
    </Container>
  );
};

export default PostingDetailPage;
