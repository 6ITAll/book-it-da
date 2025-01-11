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

export interface DialogWithActionProps extends BaseDialogProps {
  action: string;
  onActionClick: () => void;
}

export interface DialogWithOutActionProps extends BaseDialogProps {
  action?: undefined;
  onActionClick?: never;
}

export type HybridDialogProps =
  | DialogWithActionProps
  | DialogWithOutActionProps;

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
      aria-hidden="false"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: fullScreen ? '0px' : '10px',
        },
      }}
      aria-label="hidden"
    >
      {title && (
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {onBack ? (
              <IconButton onClick={onBack} aria-label="back">
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
      <DialogContent>{contentNode}</DialogContent>
      {action && (
        <DialogActions sx={{ padding: 0 }}>
          {/* 하단 전체를 차지하는 버튼 (1개의 Action) */}
          <Button
            variant="contained"
            onClick={handleAction}
            fullWidth
            sx={{ borderRadius: 0 }}
            aria-label="action"
          >
            {action}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default HybridDialog;
