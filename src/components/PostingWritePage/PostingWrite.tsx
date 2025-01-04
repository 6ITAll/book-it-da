import { Stack } from '@mui/material';
import { styles } from './PostingWrite.styles';
import PostingToolbar from './PostingToolbar';
import BookSearchPopover from './BookSearchPopover';
import PostingContent from './PostingContent';
import { useState } from 'react';
import { Book } from '@shared/types/type';
import PostingWriteHeader from './PostingWriteHeader';

const PostingWrite = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // 글감 버튼 클릭 시 책 검색 메뉴 열림
  const handleMaterialClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 책 검색 메뉴 닫힘
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack sx={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box' }}>
      <PostingWriteHeader
        title={title}
        content={content}
        selectedBook={selectedBook}
      />
      <Stack sx={styles.Content}>
        <PostingToolbar handleMaterialClick={handleMaterialClick} />
        <BookSearchPopover
          anchorEl={anchorEl}
          onClose={handleClose}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
        <PostingContent
          selectedBook={selectedBook}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
      </Stack>
    </Stack>
  );
};

export default PostingWrite;
