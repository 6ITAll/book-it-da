import { lazy, Suspense } from 'react';
import { DialogWithOutActionProps } from './HybridDialog/HybridDialog';
import { CircularProgress } from '@mui/material';

const HybridDialog = lazy(
  () => import('@components/commons/HybridDialog/HybridDialog'),
);

interface NonTitleDialogProps extends Omit<DialogWithOutActionProps, 'title'> {
  title?: never;
}

const NonTitleDialog = ({
  contentNode,
  maxWidth,
  open,
  setOpen,
  fullScreen,
}: NonTitleDialogProps): JSX.Element => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <HybridDialog
        contentNode={contentNode}
        action="닫기"
        onActionClick={() => setOpen(false)}
        maxWidth={maxWidth}
        open={open}
        setOpen={setOpen}
        fullScreen={fullScreen}
      />
    </Suspense>
  );
};

export default NonTitleDialog;
