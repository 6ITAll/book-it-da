import PostingWrite from '@components/PostingWritePage/PostingWrite';
import { postingWriteStyles } from '@components/PostingWritePage/PostingWrite.styles';
import { Container } from '@mui/material';

const PostingWritePage = () => {
  return (
    <Container maxWidth={false} sx={postingWriteStyles.container}>
      <PostingWrite />
    </Container>
  );
};

export default PostingWritePage;
