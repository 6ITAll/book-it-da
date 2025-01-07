import { Button, Stack, Typography } from '@mui/material';
import { styles } from './PostingWrite.styles';
import PostingToolbar from './PostingToolbar';
import BookSearchPopover from './BookSearchPopover';
import PostingContent from './PostingContent';
import { useState } from 'react';
import { Book, User } from '@shared/types/type';
import PostingWriteHeader from './PostingWriteHeader';
import { useLocation } from 'react-router-dom';
import { PostingRequest } from '@features/PostingWritePage/types/types';
import NonTitleDialog from '@components/commons/NonTitleDialog';
import { useTempSave } from '@hooks/useTempSave';

type CurrentUser = Omit<User, 'isFollowing' | 'isFollower'>;

const mockCurrentUser: CurrentUser = {
  userId: 1,
  userName: 'MockUser',
  avatarUrl: 'https://example.com/avatar.jpg',
};
const PostingWrite = () => {
  const location = useLocation();
  const bookFromDetail = location.state?.book as Book;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(
    bookFromDetail || null,
  );
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const {
    showLoadDialog,
    setShowLoadDialog,
    tempSaveDate,
    loadTempPosting,
    ignoreTempPosting,
  } = useTempSave(
    title,
    content,
    selectedBook,
    bookFromDetail,
    setTitle,
    setContent,
    setSelectedBook,
  );

  const currentPosting = {
    title,
    content,
    book: selectedBook || ({} as Book), // null 대신 빈 객체 사용
    user: mockCurrentUser as User, // User 타입으로 타입 단언
  };

  // 글감 버튼 클릭 시 책 검색 메뉴 열림
  const handleMaterialClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 책 검색 메뉴 닫힘
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoadPosting = (posting: PostingRequest) => {
    setTitle(posting.title);
    setContent(posting.content);
    setSelectedBook(posting.book);
  };

  return (
    <Stack sx={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box' }}>
      <PostingWriteHeader
        title={title}
        content={content}
        selectedBook={selectedBook}
        user={mockCurrentUser}
      />
      <Stack sx={styles.Content}>
        <PostingToolbar
          currentPosting={currentPosting}
          handleMaterialClick={handleMaterialClick}
          onLoadPosting={handleLoadPosting}
        />
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
      <NonTitleDialog
        open={showLoadDialog}
        setOpen={setShowLoadDialog}
        contentNode={
          <Stack spacing={2}>
            <Typography>
              {tempSaveDate &&
                `${tempSaveDate.getFullYear()}년 ${tempSaveDate.getMonth() + 1}월 ${tempSaveDate.getDate()}일 ${tempSaveDate.getHours()}시 ${tempSaveDate.getMinutes()}분`}{' '}
              작성 중이던 글이 있습니다. 불러오시겠습니까?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={ignoreTempPosting} variant="outlined">
                취소
              </Button>
              <Button onClick={loadTempPosting} variant="contained">
                확인
              </Button>
            </Stack>
          </Stack>
        }
      />
    </Stack>
  );
};

export default PostingWrite;
