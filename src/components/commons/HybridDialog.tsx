import {
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
import { ReactNode } from 'react';

interface BaseDialogProps extends DialogProps {
  title: string;
  contentNode: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
}: HybridDialogProps): JSX.Element => {
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onActionClick) return;
    e.stopPropagation();

    onActionClick();
    handleClose(e);
  };

  return (
    <Dialog
      container={document.getElementById('root')}
      fullWidth={true}
      maxWidth={maxWidth}
      open={open}
      closeAfterTransition={false}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{title}</Typography>
          {!action && (
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>
      <DialogContent>{contentNode}</DialogContent>
      {action && (
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleAction}>{action}</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
export default HybridDialog;
