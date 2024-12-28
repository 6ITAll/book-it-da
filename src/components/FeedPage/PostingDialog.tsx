import { Box, Button, Divider, Popover, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PostType } from './WriteDialog';
import TextEditor from '@components/commons/TextEditor';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';
import HybridDialog from '@components/commons/HybridDialog';
import CommonBookCard from '@components/commons/CommonBookCard';

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

  // 다이얼로그 닫히면 책 검색 결과 초기화
  useEffect(() => {
    if (selectedType !== 'post') {
      setSelectedBook(null);
      setSearchQuery('');
    }
  }, [selectedType]);

  // 다이얼로그 닫히면 상태 초기화
  useEffect(() => {
    if (selectedType !== 'post') {
      setSelectedBook(null);
      setSearchQuery('');
      setTitle('');
      setContent('');
    }
  }, [selectedType]);

  const contentNode = (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        borderTop: '1px solid #ccc',
        boxSizing: 'border-box',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: '100%',
          padding: '0.5rem 1rem',
          boxSizing: 'border-box',
          backgroundColor: '#fcfcfc',
          borderBottom: '1px solid #ccc',
          flex: '0 0 auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {/* 포스팅 임시저장 버튼 */}
          <Button
            size="small"
            onClick={() => {}}
            sx={{
              fontSize: '11px',
              color: '#333',
              backgroundColor: '#ddd',
              borderRadius: '4px 0px 0px 4px',
              '&:hover': {
                backgroundColor: '#c0c0c0',
              },
            }}
          >
            저장
          </Button>
          <Divider orientation="vertical" flexItem />
          {/* 저장된 포스팅 불러오기 버튼 */}
          <Button
            size="small"
            onClick={() => {}}
            sx={{
              fontSize: '11px',
              color: '#333',
              backgroundColor: '#ddd',
              minWidth: '30px',
              borderRadius: '0px 4px 4px 0px',
              '&:hover': {
                backgroundColor: '#c0c0c0',
              },
            }}
          >
            0
          </Button>
        </Box>
        {/* 글감 버튼 */}
        <Button
          size="small"
          onClick={handleMaterialClick}
          sx={{
            fontSize: '11px',
            backgroundColor: '#ddd',
            color: '#333',
            '&:hover': {
              backgroundColor: '#c0c0c0',
            },
          }}
        >
          글감
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box
            sx={{
              p: 2,
              width: {
                xs: '250px',
                md: '300px',
              },
            }}
          >
            <BookSearchAutoComplete
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
            />
          </Box>
        </Popover>
      </Stack>
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          overflow: 'auto',
          flex: '1 1 auto',
        }}
      >
        <Stack
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
            padding: {
              xs: '0 1rem 1rem 1rem',
              md: '0',
            },
            backgroundColor: '#fcfcfc',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1 1 auto',
          }}
        >
          {/* 글감 선택 시 */}
          {selectedBook && (
            <Box sx={{ width: '60%', height: '250' }}>
              <CommonBookCard
                image={selectedBook.imageUrl}
                title={selectedBook.bookTitle}
                author={selectedBook.author}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  my: 1,
                  // '& .card-media': {
                  //   backgroundColor: '#d0d0d0',
                  //   padding: '1rem 0',
                  // },
                  // '& .card-content': {
                  //   display: 'flex',
                  //   flexDirection: 'column',
                  //   justifyContent: 'center',
                  //   alignItems: 'center',
                  // },
                }}
              />
            </Box>
          )}

          {/* 포스팅 제목 입력창 */}
          <Stack flex="0 0 auto">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  '& input': {
                    textAlign: 'center',
                    fontSize: '24px',
                    padding: 0,
                  },
                  '& fieldset': {
                    border: 'none',
                    borderRadius: 0,
                    borderBottom: '1px solid #ccc',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                    borderBottom: '1px solid #ccc',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none !important',
                    borderBottom: '1px solid #ccc !important',
                  },
                },
                '& input::placeholder': {
                  textAlign: 'center',
                  opacity: 0.4,
                },
              }}
            />
          </Stack>
          <Box
            sx={{
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextEditor value={content} setValue={setContent} />
          </Box>
        </Stack>
      </Stack>
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
