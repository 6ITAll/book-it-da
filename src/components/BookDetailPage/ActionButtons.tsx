import { Stack, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import URLShareDialog from '@components/commons/URLShareDialog';
import { useNavigate } from 'react-router-dom';
import { Book } from '@shared/types/type';
import { bookDetailStyles } from './BookDetail.styles';

interface ActionButtonsProps {
  book: Book;
}
const ActionButtons = ({ book }: ActionButtonsProps): JSX.Element => {
  const navigate = useNavigate();
  const [openShareDialog, setOpenShareDialog] = useState<boolean>(false); // 공유 모달 상태 추가

  const handleWriteClick = () => {
    navigate('/posting/write', { state: { book } });
  };
  const handleShareClick = () => {
    setOpenShareDialog(true); // 공유 모달 열기
  };

  const handleCloseShareDialog = () => {
    setOpenShareDialog(false); // 공유 모달 닫기
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          sx={bookDetailStyles.postingButton}
          onClick={handleWriteClick} // 클릭 시 모달 열기
        >
          <EditIcon sx={{ width: 18, height: 18 }} />
        </Button>
        <Button
          onClick={handleShareClick} // 공유 모달 열기
          sx={bookDetailStyles.shareButton}
        >
          <ShareIcon sx={{ width: 18, height: 18 }} />
        </Button>
      </Stack>
      {/* 공유 모달 */}
      <URLShareDialog
        open={openShareDialog}
        handleClose={handleCloseShareDialog}
      />
    </>
  );
};

export default ActionButtons;
