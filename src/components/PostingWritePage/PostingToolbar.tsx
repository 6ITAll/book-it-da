import React, { useState } from 'react';
import { Box, Button, Divider, Stack } from '@mui/material';
import { postingWriteStyles } from './PostingWrite.styles';
import { Book, SavedPosting } from '@shared/types/type';
import {
  useGetSavedPostingsQuery,
  useSavePostingMutation,
} from '@features/PostingWritePage/api/postingWriteApi';

import { PostingRequest } from '@features/PostingWritePage/types/types';
import SavedPostingsDialog from './SavedPostingDialog';

interface PostingToolbarProps {
  handleMaterialClick: (event: React.MouseEvent<HTMLElement>) => void;
  currentPosting: {
    title: string;
    content: string;
    book: Book;
  };
  onLoadPosting: (posting: PostingRequest) => void;
}

const PostingToolbar: React.FC<PostingToolbarProps> = ({
  handleMaterialClick,
  currentPosting,
  onLoadPosting,
}) => {
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

  const handleLoadPosting = (posting: SavedPosting) => {
    onLoadPosting({
      title: posting.title || '',
      content: posting.content || '',
      book: { isbn: posting.isbn || '' } as Book,
    });
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={postingWriteStyles.postingToolbar}
      >
        <Button
          size="small"
          onClick={handleMaterialClick}
          sx={postingWriteStyles.postingMaterialButton}
        >
          글감
        </Button>
        <Box sx={postingWriteStyles.postingSaveBox}>
          <Button
            size="small"
            onClick={handleSave}
            sx={postingWriteStyles.postingSaveButton}
          >
            저장
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            size="small"
            onClick={() => setDialogOpen(true)}
            sx={postingWriteStyles.postingLoadButton}
          >
            {savedPostings?.length || 0}
          </Button>
        </Box>
      </Stack>
      <SavedPostingsDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        savedPostings={savedPostings}
        onLoadPosting={handleLoadPosting}
      />
    </>
  );
};

export default PostingToolbar;
