import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ReactNode, useEffect } from 'react';

interface BaseDialogProps extends DialogProps {
  title?: string;
  contentNode: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onBack?: () => void;
  fullScreen?: boolean;
}

interface DialogWithActionProps extends BaseDialogProps {
  action: string;
  onActionClick: () => void;
}

interface DialogWithOutActionProps extends BaseDialogProps {
  action?: undefined;
  onActionClick?: never;
}

type HybridDialogProps = DialogWithActionProps | DialogWithOutActionProps;

const HybridDialog = ({
  title,
  contentNode,
  action,
  onActionClick,
  maxWidth = 'xs',
  open,
  setOpen,
  onBack,
  fullScreen,
}: HybridDialogProps): JSX.Element => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    if (!onActionClick) return;
    onActionClick();
    handleClose();
  };
  // FullScreen 다이얼로그가 오픈됐을 때, 바깥 영역의 스크롤바를 없앰
  useEffect(() => {
    if (open && fullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open, fullScreen]);

  return (
    <Dialog
      container={document.getElementById('root')}
      fullWidth={true}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      closeAfterTransition={false}
      fullScreen={fullScreen}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: fullScreen ? '0px' : '10px',
        },
      }}
    >
      {title && (
        <DialogTitle sx={{ padding: '0.5rem' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {onBack ? (
              <IconButton onClick={onBack}>
                <ArrowBackIcon />
              </IconButton>
            ) : (
              // 뒤로가기 버튼만큼의 여백 > 타이틀 중앙에 오도록
              <Box sx={{ width: 30 }} />
            )}
            <Typography sx={{ textAlign: 'center' }}>{title}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
      )}
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '&.MuiDialogContent-root': {
            padding: '1rem',
          },
        }}
      >
        {contentNode}
      </DialogContent>
      {action && (
        <DialogActions
          sx={{
            justifyContent: 'center',
            padding: '0',
          }}
        >
          {/* 하단 전체를 차지하는 버튼 (1개의 Action) */}
          <Button
            variant="contained"
            onClick={handleAction}
            sx={{
              margin: '0',
              width: '100%',
              padding: '0.5rem',
              borderRadius: fullScreen ? '0px' : '0px 0px 10px 10px',
            }}
          >
            {action}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default HybridDialog;
