import {
  Box,
  IconButton,
  Typography,
  Stack,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import React, { useState } from 'react';
import NonTitleDialog from '@components/commons/NonTitleDialog';

interface URLShareDialogProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  url?: string;
}

const URLShareDialog = ({ open, handleClose, url }: URLShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const shareUrl = url || window.location.href;
  const theme = useTheme();

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
      await navigator.clipboard.writeText(shareUrl);
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
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
          gap: 1,
          boxShadow:
            theme.palette.mode === 'light'
              ? '0px 4px 10px rgba(0, 0, 0, 0.1)' // 라이트 모드 그림자
              : '0px 4px 10px rgba(255, 255, 255, 0.1)', // 다크 모드 그림자
          border:
            theme.palette.mode === 'light'
              ? '1px solid rgba(0, 0, 0, 0.1)' // Subtle border for light mode
              : '1px solid rgba(255, 255, 255, 0.1)', // Subtle border for dark mode
        }}
      >
        <Typography
          variant="body2"
          sx={{
            wordBreak: 'break-all',
            color: theme.palette.text.primary,
            flex: 1,
          }}
        >
          {shareUrl}
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
      <NonTitleDialog
        open={open}
        setOpen={handleClose}
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

export default URLShareDialog;
