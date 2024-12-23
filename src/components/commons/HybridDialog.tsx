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
import { ReactNode } from 'react';

interface BaseDialogProps extends DialogProps {
  title: string;
  contentNode: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onBack?: () => void;
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
}: HybridDialogProps): JSX.Element => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    if (!onActionClick) return;
    onActionClick();
    handleClose();
  };

  return (
    <Dialog
      container={document.getElementById('root')}
      fullWidth={true}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      closeAfterTransition={false}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px',
        },
      }}
    >
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
              borderRadius: '0px 0px 10px 10px',
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
