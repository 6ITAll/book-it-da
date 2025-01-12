import { Box } from '@mui/material';
import parse from 'html-react-parser';
import CommonBookCard from '@components/commons/CommonBookCard';
import { useNavigate } from 'react-router-dom';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { Book } from '@shared/types/type';
import { postingDetailStyles } from './PostingDetail.styles';

interface PostingContentProps {
  content: string;
  book: Book;
}

const PostingContent = ({ content, book }: PostingContentProps) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    if (book?.itemId) {
      navigateToBookDetailPage(navigate, book.itemId);
    }
  };
  return (
    <>
      {/* 책 정보 */}
      <Box sx={postingDetailStyles.bookPreviewBox} onClick={handleBookClick}>
        {book && (
          <CommonBookCard
            image={book.imageUrl}
            title={book.bookTitle}
            author={book.author}
            sx={postingDetailStyles.bookCard}
          />
        )}
      </Box>
      {/* 포스팅 내용 */}
      <Box sx={{ whiteSpace: 'pre-wrap' }}>{parse(content)}</Box>
    </>
  );
};

export default PostingContent;
