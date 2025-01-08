import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { styles } from './PostingWrite.styles';
import { Book, User } from '@shared/types/type';
import {
  useGetSavedPostingsQuery,
  useSavePostingMutation,
} from '@features/PostingWritePage/api/postingWriteApi';
import { useState } from 'react';
import HybridDialog from '@components/commons/HybridDialog/HybridDialog';
import { PostingRequest } from '@features/PostingWritePage/types/types';

interface PostingToolbarProps {
  handleMaterialClick: (event: React.MouseEvent<HTMLElement>) => void;
  currentPosting: {
    title: string;
    content: string;
    book: Book;
    user: User;
  };
  onLoadPosting: (posting: PostingRequest) => void;
}

const PostingToolbar = ({
  handleMaterialClick,
  currentPosting,
  onLoadPosting,
}: PostingToolbarProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: savedPostings, refetch } = useGetSavedPostingsQuery();
  const [savePosting] = useSavePostingMutation();

  const handleSave = async () => {
    try {
      await savePosting(currentPosting).unwrap();
      refetch();
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  const handleOpenSavedList = () => {
    setDialogOpen(true);
  };

  const handleLoadPosting = (posting: PostingRequest) => {
    onLoadPosting(posting);
    setDialogOpen(false);
  };

  const savedPostingsContent = (
    <Stack spacing={2}>
      {savedPostings?.map((posting, index) => (
        <Box
          key={index}
          onClick={() => handleLoadPosting(posting)}
          sx={styles.savedPostingBox}
        >
          <Typography variant="h6">{posting.title}</Typography>
          <Typography variant="body2">
            {posting.book?.bookTitle || '책 정보 없음'}
          </Typography>
        </Box>
      ))}
    </Stack>
  );

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={styles.postingToolbar}
      >
        <Button
          size="small"
          onClick={handleMaterialClick}
          sx={styles.postingMaterialButton}
        >
          글감
        </Button>
        <Box sx={styles.postingSaveBox}>
          <Button
            size="small"
            onClick={handleSave}
            sx={styles.postingSaveButton}
          >
            저장
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            size="small"
            onClick={handleOpenSavedList}
            sx={styles.postingLoadButton}
          >
            {savedPostings?.length || 0}
          </Button>
        </Box>
      </Stack>
      <HybridDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="저장된 글 목록"
        contentNode={savedPostingsContent}
      />
    </>
  );
};

export default PostingToolbar;
