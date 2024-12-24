import HybridDialog from '@components/commons/HybridDialog';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import PostingDialog from './PostingDialog';
import OneLineReviewDialog from './OneLineReviewDialog';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export type PostType = 'post' | 'review' | null;

interface WriteDialogProps {
  writeDialogOpen: boolean;
  setWriteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WriteDialog = ({
  writeDialogOpen,
  setWriteDialogOpen,
}: WriteDialogProps) => {
  const [selectedType, setSelectedType] = useState<PostType>(null);

  const handleTypeSelect = (type: PostType) => {
    setSelectedType(type);
    setWriteDialogOpen(false); // 첫 번째 모달 닫기
  };

  const handleBack = () => {
    setSelectedType(() => null);
    setWriteDialogOpen(true);
  };

  const contentNode = (
    <Stack spacing={2}>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<PostAddIcon />}
        onClick={() => handleTypeSelect('post')}
      >
        포스트 작성
      </Button>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<BorderColorIcon />}
        onClick={() => handleTypeSelect('review')}
      >
        한줄평 작성
      </Button>
    </Stack>
  );

  return (
    <>
      <HybridDialog
        open={writeDialogOpen}
        setOpen={setWriteDialogOpen}
        title="포스트 타입"
        contentNode={contentNode}
        maxWidth="xs"
      />
      {/* 포스팅 작성 모달 */}
      <PostingDialog
        handleBack={handleBack}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
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

export default WriteDialog;
