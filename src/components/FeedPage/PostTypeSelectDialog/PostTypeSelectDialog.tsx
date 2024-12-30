import HybridDialog from '@components/commons/HybridDialog';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import PostingDialog from '../PostingDialog/PostingDialog';
import OneLineReviewDialog from '../OneLineReviewDialog/OneLineReviewDialog';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PostType } from '@shared/types/type';

interface PostTypeSelectDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostTypeSelectDialog = ({
  dialogOpen,
  setDialogOpen,
}: PostTypeSelectDialogProps) => {
  const [selectedType, setSelectedType] = useState<PostType>(null);

  const handleTypeSelect = (type: PostType) => {
    setSelectedType(type);
    setDialogOpen(false); // 첫 번째 모달 닫기
  };

  const handleBack = () => {
    setSelectedType(() => null);
    setDialogOpen(true);
  };

  const contentNode = (
    <Stack
      spacing={0}
      sx={{
        '& .MuiButton-root': {
          py: 2,
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          border: 'none',
          '&:hover': {
            backgroundColor: '#e0e0e0',
            border: 'none',
          },
          '& .MuiButton-startIcon': {
            marginRight: 1, // 아이콘과 텍스트 사이 간격 줄임
          },
        },
      }}
    >
      <Button
        variant="outlined"
        fullWidth
        startIcon={<PostAddIcon />}
        endIcon={<ChevronRightIcon />}
        onClick={() => handleTypeSelect('포스팅')}
      >
        포스팅 작성
      </Button>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<BorderColorIcon />}
        endIcon={<ChevronRightIcon />}
        onClick={() => handleTypeSelect('한줄평')}
      >
        한줄평 작성
      </Button>
    </Stack>
  );

  return (
    <>
      <HybridDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
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

export default PostTypeSelectDialog;
