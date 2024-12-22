import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { PostType } from './WriteDialog';

interface OneLineReviewDialogProps {
  handleBack: () => void;
  selectedType: PostType;
  setSelectedType: React.Dispatch<React.SetStateAction<PostType>>;
}

const OneLineReviewDialog = ({
  selectedType,
  setSelectedType,
  handleBack,
}: OneLineReviewDialogProps) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={selectedType === 'review'}
      onClose={() => setSelectedType(null)}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px',
        },
      }}
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
            <Typography>한줄평 작성</Typography>
          </Stack>
          <IconButton onClick={() => setSelectedType(null)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          '&.MuiDialogContent-root': {
            padding: '30px 20px',
          },
        }}
      >
        <TextField
          fullWidth
          label="책 검색"
          variant="outlined"
          placeholder="책 제목을 입력하세요"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
        <TextField
          fullWidth
          multiline
          label="한줄평"
          variant="outlined"
          placeholder="한줄평을 입력하세요"
          minRows={12} // 약 300px 높이를 위한 설정
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              height: '300px',
              '& textarea': {
                height: '100% !important',
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: '0',
        }}
      >
        <Button
          variant="contained"
          sx={{
            margin: '0',
            width: '100%',
            padding: '10px',
            borderRadius: '0px 0px 10px 10px',
          }}
        >
          한줄평 작성
        </Button>{' '}
      </DialogActions>
    </Dialog>
  );
};

export default OneLineReviewDialog;
