import { useState } from 'react';
import { Stack, Container, Box } from '@mui/material';
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

  const { data: post, isLoading, error } = useGetPostByIdQuery(postingId!);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!post || !postingId) return <div>잘못된 접근입니다.</div>;

  return (
    <Container maxWidth={false} sx={postingDetailStyles.container}>
      {/* 포스팅 헤더 */}
      <PostingHeader
        title={post.title}
        setOpenShareDialog={setOpenShareDialog}
        postingId={post.id}
        isUserOwnsPost={post.isUserOwnsPost}
      />
      {/* 포스팅 정보 */}
      <Stack sx={postingDetailStyles.posting}>
        {/* 유저 정보 */}
        <PostingUserInfo
          user={post.user}
          createdAt={post.createdAt}
          isUserOwnsPost={post.isUserOwnsPost}
        />
        {/* 포스팅 정보 */}
        <PostingContent content={post.content} book={post.book} />
      </Stack>

      <Stack sx={{ width: '80%', mt: '1rem', boxSizing: 'border-box' }}>
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
      {/* 댓글 섹션 */}
      <Box sx={postingDetailStyles.CommentSectionWrapper}>
        <CommentSection postId={post.id} />
      </Box>
      <URLShareDialog open={openShareDialog} handleClose={setOpenShareDialog} />
    </Container>
  );
};

export default PostingDetailPage;
