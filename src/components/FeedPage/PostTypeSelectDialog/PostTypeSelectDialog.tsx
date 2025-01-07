import { Stack } from '@mui/material';
import { useState } from 'react';
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

  const handleTypeSelect = (type: PostType) => {
    setSelectedType(type);
    setDialogOpen(false); // 첫 번째 모달 닫기
  };

  const handleBack = () => {
    setSelectedType(() => '선택안함');
    setDialogOpen(true);
  };

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

      {/* 한줄평 작성 모달 */}
      <OneLineReviewDialog
        handleBack={handleBack}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </>
  );
};

export default PostTypeSelectDialog;
