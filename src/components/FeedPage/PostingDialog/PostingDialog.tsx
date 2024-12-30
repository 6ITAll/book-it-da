import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PostType } from '../WriteDialog';
import { Book } from '@shared/types/type';
import HybridDialog from '@components/commons/HybridDialog';
import { styles } from './PostingDialog.styles';
import BookSearchPopover from './BookSearchPopover';
import PostingContent from './PostingContent';
import PostingToolbar from './PostingToolbar';

interface PostingDialogProps {
  handleBack: () => void;
  selectedType: PostType;
  setSelectedType: React.Dispatch<React.SetStateAction<PostType>>;
}

const PostingDialog = ({
  selectedType,
  setSelectedType,
  handleBack,
}: PostingDialogProps) => {
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

  // 상태 초기화 함수
  const resetState = () => {
    setSelectedBook(null);
    setSearchQuery('');
    setTitle('');
    setContent('');
  };

  // 다이얼로그 닫히면 상태 초기화
  useEffect(() => {
    if (selectedType !== 'post') {
      resetState();
    }
  }, [selectedType]);

  const contentNode = (
    <Stack sx={styles.dialogContent}>
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
  );

  return (
    <HybridDialog
      title="포스팅 작성"
      contentNode={contentNode}
      open={selectedType === 'post'}
      setOpen={() => setSelectedType(null)}
      onBack={handleBack}
      action="포스팅 작성"
      onActionClick={() => {}}
      fullScreen
      sx={{
        '&.MuiDialogContent-root': {
          padding: '0 !important',
        },
      }}
    />
  );
};

export default PostingDialog;
