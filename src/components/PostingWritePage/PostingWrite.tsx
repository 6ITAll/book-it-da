import { Stack } from '@mui/material';
import { styles } from './PostingWrite.styles';
import PostingToolbar from './PostingToolbar';
import BookSearchPopover from './BookSearchPopover';
import PostingContent from './PostingContent';
import { useEffect, useState } from 'react';
import { Book } from '@shared/types/type';
import PostingWriteHeader from './PostingWriteHeader';
import { useLocation, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '@features/PostDetailPage/api/postingApi';

const PostingWrite = () => {
  const { postingId } = useParams();
  const location = useLocation();
  const isEditing = location.pathname.includes('/posting/edit');
  // 상세페이지에서 포스팅 작성 누를 시 책 정보 가져옴
  const bookFromDetail = location.state?.book as Book;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(
    bookFromDetail || null,
  );
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data: postData } = useGetPostByIdQuery(postingId!, {
    skip: !isEditing || !postingId,
  });

  useEffect(() => {
    if (isEditing && postData) {
      setTitle(postData.title);
      setContent(postData.content);
      setSelectedBook(postData.book);
    } else if (!isEditing) {
      setSelectedBook(bookFromDetail || null);
    }
  }, [isEditing, postData, bookFromDetail]);

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
        isEditing={isEditing}
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
