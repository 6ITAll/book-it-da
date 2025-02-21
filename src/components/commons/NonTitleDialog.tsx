import { lazy } from 'react';
import { DialogWithOutActionProps } from './HybridDialog/HybridDialog';

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
    <HybridDialog
      contentNode={contentNode}
      action="닫기"
      onActionClick={() => setOpen(false)}
      maxWidth={maxWidth}
      open={open}
      setOpen={setOpen}
      fullScreen={fullScreen}
    />
  );
};

export default NonTitleDialog;
