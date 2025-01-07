import PostingWrite from '@components/PostingWritePage/PostingWrite';
import { Container } from '@mui/material';

const PostingWritePage = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: '0 !important',
        margin: '0 !important',
        backgroundColor: '#f0f0f0',
        boxSizing: 'border-box',
      }}
    >
      <PostingWrite />
    </Container>
  );
};

export default PostingWritePage;
