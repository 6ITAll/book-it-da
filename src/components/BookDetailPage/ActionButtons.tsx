import { Stack, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { PostType } from '@shared/types/type';
import PostingDialog from '@components/FeedPage/PostingDialog/PostingDialog';
import { useState } from 'react';

const ActionButtons = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState<PostType>(null);

  const handleEditClick = (type: PostType) => {
    setSelectedType(type);
  };

  const handleCloseDialog = () => {
    setSelectedType(null); // 모달 닫기
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          sx={{
            borderRadius: '50%',
            minWidth: 0,
            width: 36,
            height: 36,
            backgroundColor: '#f5f5f5',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': { backgroundColor: '#e0e0e0' },
          }}
          onClick={() => handleEditClick('포스팅')} // 클릭 시 모달 열기
        >
          <EditIcon sx={{ width: 18, height: 18 }} />
        </Button>
        <Button
          sx={{
            borderRadius: '50%',
            minWidth: 0,
            width: 36,
            height: 36,
            backgroundColor: '#f5f5f5',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': { backgroundColor: '#e0e0e0' },
          }}
        >
          <ShareIcon sx={{ width: 18, height: 18 }} />
        </Button>
      </Stack>
      <PostingDialog
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        handleBack={handleCloseDialog}
      />
    </>
  );
};

export default ActionButtons;
