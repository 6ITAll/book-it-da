import { Box } from '@mui/material';
import parse from 'html-react-parser';
import CommonBookCard from '@components/commons/CommonBookCard';
import { useNavigate } from 'react-router-dom';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { Book } from '@shared/types/type';
import { postingDetailStyles } from './PostingDetail.styles';
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';

interface PostingContentProps {
  content: string;
  book: Book;
}

const PostingContent = ({ content, book }: PostingContentProps) => {
  const navigate = useNavigate();
  const { data: bookData, isLoading: isBookLoading } = useSearchBookByIsbnQuery(
    { isbn: book.isbn || '' },
    { skip: !book.isbn },
  );

  const handleBookClick = () => {
    if (book?.isbn) {
      navigateToBookDetailPage(navigate, book.isbn);
    }
  };
  return (
    <>
      {/* 책 정보 */}
      <Box sx={postingDetailStyles.bookPreviewBox} onClick={handleBookClick}>
        {isBookLoading ? (
          <div>로딩 중...</div>
        ) : bookData ? (
          <CommonBookCard
            image={bookData.cover}
            title={bookData.title}
            author={bookData.author}
            sx={postingDetailStyles.bookCard}
          />
        ) : (
          <div>책 정보를 찾을 수 없습니다.</div>
        )}
      </Box>
      {/* 포스팅 내용 */}
      <Box sx={{ whiteSpace: 'pre-wrap' }}>{parse(content)}</Box>
    </>
  );
};

export default PostingContent;
