import {
  Box,
  IconButton,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import React, { useState } from 'react';
import HybridDialog from '@components/commons/HybridDialog';

interface PostingShareDialogProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostingShareDialog = ({ open, handleClose }: PostingShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // 스낵바 X 누르면 꺼지도록
  const handleCloseSnackbar = (
    _?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    // snackbar 외부 눌렀을 때 snackbar가 꺼지지 않도록 (사용자의 클릭 event가 있어도 자동으로 꺼지도록)
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setOpenSnackbar(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  const shareDialogContent = (
    <Stack spacing={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          gap: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            wordBreak: 'break-all',
            flex: 1,
          }}
        >
          {window.location.href}
        </Typography>
        <IconButton
          onClick={handleCopyClick}
          color={copied ? 'success' : 'default'}
          size="small"
        >
          {copied ? <DoneIcon /> : <ContentCopyIcon />}
        </IconButton>
      </Box>
    </Stack>
  );

  return (
    <>
      <HybridDialog
        open={open}
        setOpen={handleClose}
        title="포스팅 공유하기"
        contentNode={shareDialogContent}
      />
      {/* 추후 공통 스낵바로 교체 */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          클립보드에 복사되었습니다
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostingShareDialog;
