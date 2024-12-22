import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { PostType } from './WriteDialog';

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
  return (
    <Dialog
      fullScreen
      open={selectedType === 'post'}
      onClose={() => setSelectedType(null)}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography>포스트 작성</Typography>
          </Stack>
          <IconButton onClick={() => setSelectedType(null)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>{/* 포스트 작성 폼 컴포넌트 */}</DialogContent>
    </Dialog>
  );
};

export default PostingDialog;
