import { Stack, Button } from '@mui/material';
import { useState } from 'react';
import AddToLibraryModal from './AddToLibraryDialog'; // AddToLibraryModal 가져오기
import { bookDetailStyles } from './BookDetail.styles';

interface FooterButtonsProps {
  itemId: number;
  title: string;
  author: string;
  imageUrl: string;
  link?: string;
}

const FooterButtons = ({
  itemId,
  title,
  author,
  imageUrl,
  link,
}: FooterButtonsProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleGoToBuy = () => {
    if (link) {
      window.open(link, '_blank'); // 링크로 이동
    } else {
      console.warn('구매 링크가 제공되지 않았습니다.');
    }
  };

  return (
    <Stack direction="row" height="15%" borderTop="1px solid #e7e8e9">
      <Button onClick={handleGoToBuy} sx={bookDetailStyles.goToBuyButton}>
        사러 가기
      </Button>
      <Button
        onClick={() => setIsModalOpen(true)}
        sx={{ flex: 1, borderRadius: '0 0 8px 0' }}
      >
        내 서재에 담기
      </Button>
      {/* AddToLibraryModal 연결 */}
      <AddToLibraryModal
        itemId={itemId}
        title={title}
        author={author}
        imageUrl={imageUrl}
        open={isModalOpen}
        setOpen={setIsModalOpen} // 상태 관리 함수 전달
      />
    </Stack>
  );
};

export default FooterButtons;
