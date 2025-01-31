import { Stack } from '@mui/material';
import { useState, useCallback, memo } from 'react';
import OneLineReviewDialog from '../OneLineReviewDialog/OneLineReviewDialog';
import { PostType } from '@shared/types/type';
import { POST_TYPE_OPTIONS } from 'src/constants';
import PostTypeButton from './PostTypeButton';
import NonTitleDialog from '@components/commons/NonTitleDialog';

interface PostTypeSelectDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostTypeSelectDialog = ({
  dialogOpen,
  setDialogOpen,
}: PostTypeSelectDialogProps): JSX.Element => {
  const [selectedType, setSelectedType] = useState<PostType>('선택안함');

  // 다이어로그 닫기
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  // 타입 선택 시 모달 닫기
  const handleTypeSelect = useCallback(
    (type: PostType) => {
      setSelectedType(type);
      handleDialogClose();
    },
    [handleDialogClose],
  );

  // 한줄평 모달에서 뒤로가기
  const handleBack = useCallback(() => {
    setSelectedType('선택안함');
    setDialogOpen(true);
  }, [setDialogOpen]);

  const contentNode = (
    <Stack spacing={0}>
      {POST_TYPE_OPTIONS.map(({ type, label, icon }) => (
        <PostTypeButton
          key={type}
          type={type}
          label={label}
          icon={icon}
          onSelect={handleTypeSelect}
        />
      ))}
    </Stack>
  );

  return (
    <>
      <NonTitleDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        contentNode={contentNode}
        maxWidth="xs"
      />
      <OneLineReviewDialog
        handleBack={handleBack}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </>
  );
};

// React.memo 적용
export default memo(PostTypeSelectDialog);
