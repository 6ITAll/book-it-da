import { Stack, Button } from '@mui/material';
import { useState } from 'react';
import AddToLibraryModal from './AddToLibraryDialog';
interface FooterButtonsProps {
  link?: string;
}

const FooterButtons = ({ link }: FooterButtonsProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleGoToBuy = () => {
    console.log(link);
    if (link) {
      window.open(link, '_blank'); // 링크로 이동
    } else {
      console.warn('구매 링크가 제공되지 않았습니다.');
    }
  };

  return (
    <Stack direction="row" height="15%" borderTop="1px solid #e7e8e9">
      <Button
        onClick={handleGoToBuy}
        sx={{
          flex: 1,
          backgroundColor: '#333',
          color: '#fff',
          borderRadius: '0 0 0 8px',
          '&:hover': { backgroundColor: '#444' },
        }}
      >
        사러 가기
      </Button>
      <Button
        onClick={() => setIsModalOpen(true)}
        sx={{ flex: 1, borderRadius: '0 0 8px 0' }}
      >
        내서재에 담기
      </Button>
      <AddToLibraryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Stack>
  );
};

export default FooterButtons;
