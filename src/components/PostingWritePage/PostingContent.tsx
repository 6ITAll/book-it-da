import { Box, Stack, TextField } from '@mui/material';
import { postingWriteStyles } from './PostingWrite.styles';
import { BookPreviewSection } from './PostingBookPreview';
import TextEditor from '@components/commons/TextEditor';
import { Book } from '@shared/types/type';

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
}: PostingContentProps) => (
  <Stack sx={postingWriteStyles.posting}>
    {/* 글감 선택 시 */}
    {selectedBook && <BookPreviewSection book={selectedBook} />}
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

export default PostingContent;
