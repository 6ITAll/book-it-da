import { Box } from '@mui/material';
import parse from 'html-react-parser';
import CommonBookCard from '@components/commons/CommonBookCard';
import { mockBooks } from '@components/FeedPage/mockPosts';

interface PostingContentProps {
  content: string;
  book?: {
    title: string;
    author: string;
    itemId: number;
    imageUrl: string;
  };
}

const PostingContent = ({ content, book }: PostingContentProps) => {
  return (
    <>
      {/* 책 정보 */}
      <Box
        sx={{
          width: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: '1rem',
          padding: '0',
        }}
      >
        {book && (
          <CommonBookCard
            image={mockBooks[0].imageUrl}
            title={book.title}
            author={book.author}
            sx={{
              width: '100%',
              display: 'flex !important',
              flexDirection: 'row !important',
              backgroundColor: 'transparent',
              padding: '1rem',
              height: '60px',
              '& .MuiCardMedia-root': {
                width: '80px',
                height: '100%',
                padding: 'auto',
                borderRadius: '0',
              },
              '& .MuiCardContent-root': {
                flex: 1,
                padding: '0.1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box',
              },
              '& .MuiTypography-body1': {
                fontSize: '14px',
              },
              '& .MuiTypography-body2': {
                fontSize: '11px',
              },
            }}
          />
        )}
      </Box>
      {/* 포스팅 내용 */}
      <Box sx={{ whiteSpace: 'pre-wrap' }}>{parse(content)}</Box>
    </>
  );
};

export default PostingContent;
