import { Box } from '@mui/material';
import parse from 'html-react-parser';
import CommonBookCard from '@components/commons/CommonBookCard';
import { bookData } from 'src/mocks/handlers/feed';
import { useNavigate } from 'react-router-dom';
import { navigateToDetailPage } from '@shared/utils/navigation';

interface PostingContentProps {
  content: string;
  book?: {
    title: string;
    author: string;
    itemId: number;
    imageUrl: string;
  };
}

const styles = {
  bookPreviewBox: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: '1rem',
    padding: '0',
  },
  bookCard: {
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
  },
};

const PostingContent = ({ content, book }: PostingContentProps) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    if (book?.itemId) {
      navigateToDetailPage(navigate, book.itemId);
    }
  };
  return (
    <>
      {/* 책 정보 */}
      <Box sx={styles.bookPreviewBox} onClick={handleBookClick}>
        {book && (
          <CommonBookCard
            image={bookData[0].imageUrl}
            title={book.title}
            author={book.author}
            sx={styles.bookCard}
          />
        )}
      </Box>
      {/* 포스팅 내용 */}
      <Box sx={{ whiteSpace: 'pre-wrap' }}>{parse(content)}</Box>
    </>
  );
};

export default PostingContent;
