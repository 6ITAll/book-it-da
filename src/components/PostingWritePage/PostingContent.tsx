import { Box, Stack, TextField } from '@mui/material';
import { postingWriteStyles } from './PostingWrite.styles';
import { BookPreviewSection } from './PostingBookPreview';
import TextEditor from '@components/commons/TextEditor';
import { Book } from '@shared/types/type';
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';

export interface PostingContentProps {
  selectedBook: Book | null;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
}

const PostingContent = ({
  selectedBook,
  title,
  setTitle,
  content,
  setContent,
}: PostingContentProps) => {
  const { data: bookData } = useSearchBookByIsbnQuery(
    { isbn: selectedBook?.isbn ?? '' },
    { skip: !selectedBook?.isbn },
  );

  const bookToDisplay = selectedBook?.isbn
    ? {
        isbn: selectedBook.isbn,
        title: bookData?.title ?? selectedBook.title ?? '',
        author: bookData?.author ?? selectedBook.author ?? '',
        imageUrl: bookData?.cover ?? selectedBook.imageUrl ?? '',
      }
    : null;

  return (
    <Stack sx={postingWriteStyles.posting}>
      {bookToDisplay && <BookPreviewSection book={bookToDisplay} />}
      <Stack flex="0 0 auto" sx={{ width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={postingWriteStyles.postingTitle}
        />
      </Stack>
      <Box sx={postingWriteStyles.postingContentBox}>
        <TextEditor value={content} setValue={setContent} />
      </Box>
    </Stack>
  );
};

export default PostingContent;
