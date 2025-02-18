import { useState, useEffect } from 'react';
import { Stack, Container, Box, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import URLShareDialog from '@components/commons/URLShareDialog';
import PostingUserInfo from '@components/PostingDetailPage/PostingUserInfo';
import PostingContent from '@components/PostingDetailPage/PostingContent';
import PostingHeader from '@components/PostingDetailPage/PostingHeader';
import OtherPostingGrid from '@components/PostingDetailPage/OtherPostingGrid';
import CommentSection from '@components/PostingDetailPage/Comment/CommentSection';
import { useGetPostByIdQuery } from '@features/PostDetailPage/api/postingApi';
import { postingDetailStyles } from '@components/PostingDetailPage/PostingDetail.styles';

const PostingDetailPage = () => {
  const { postingId } = useParams();
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);

  const { data: post, isLoading, error } = useGetPostByIdQuery(postingId!);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!post || !postingId) return <div>잘못된 접근입니다.</div>;

  return (
    <Container
      maxWidth={false}
      sx={{
        ...postingDetailStyles.container,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <PostingHeader
        title={post.title}
        setOpenShareDialog={setOpenShareDialog}
        postingId={post.id}
        isUserOwnsPost={post.isUserOwnsPost}
      />
      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {isDesktop ? (
          // 데스크톱 레이아웃
          <>
            <Stack
              sx={{
                width: '60%',
                ...postingDetailStyles.posting,
              }}
            >
              <Stack>
                <PostingUserInfo
                  user={post.user}
                  createdAt={post.createdAt}
                  isUserOwnsPost={post.isUserOwnsPost}
                />
                <PostingContent content={post.content} book={post.book} />
              </Stack>
              <Box sx={postingDetailStyles.CommentSectionWrapper}>
                <CommentSection postId={post.id} />
              </Box>
            </Stack>
            <Box sx={{ mx: 3 }}>
              <Divider orientation="vertical" />
            </Box>
            <Stack
              sx={{
                width: '35%',
                maxWidth: '400px',
                gap: '1rem',
              }}
            >
              <OtherPostingGrid
                type="BookOtherPosting"
                isbn={post.book.isbn}
                postingId={post.id}
              />
              <OtherPostingGrid
                type="UserOtherPosting"
                userId={post.user.id}
                postingId={post.id}
              />
            </Stack>
          </>
        ) : (
          // 모바일 레이아웃
          <>
            <Stack
              sx={{
                width: '100%',
                ...postingDetailStyles.posting,
              }}
            >
              <PostingUserInfo
                user={post.user}
                createdAt={post.createdAt}
                isUserOwnsPost={post.isUserOwnsPost}
              />
              <PostingContent content={post.content} book={post.book} />
            </Stack>
            <Stack sx={{ width: '100%', mt: '1rem', gap: '1rem' }}>
              <OtherPostingGrid
                type="BookOtherPosting"
                isbn={post.book.isbn}
                postingId={post.id}
                isMobile={true}
              />
              <OtherPostingGrid
                type="UserOtherPosting"
                userId={post.user.id}
                postingId={post.id}
                isMobile={true}
              />
            </Stack>
            <Box sx={postingDetailStyles.CommentSectionWrapper}>
              <CommentSection postId={post.id} />
            </Box>
          </>
        )}
      </Box>

      <URLShareDialog open={openShareDialog} handleClose={setOpenShareDialog} />
    </Container>
  );
};

export default PostingDetailPage;
