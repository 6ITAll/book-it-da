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
      {book && (
        <CommonBookCard
          image={mockBooks[0].imageUrl}
          title={book.title}
          author={book.author}
          sx={{ width: '100%', justifyContent: 'center' }}
        />
      )}
      {/* 포스팅 내용 */}
      <Box sx={{ whiteSpace: 'pre-wrap' }}>{parse(content)}</Box>
    </>
  );
};

export default PostingContent;
