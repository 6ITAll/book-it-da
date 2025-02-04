import { Stack, Button } from '@mui/material';
import { useState } from 'react';
import AddToLibraryModal from '@components/BookDetailPage/AddToLibraryDialog';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';
interface FooterButtonsProps {
  isbn: string;
  title: string;
  author: string;
  imageUrl: string;
  link?: string;
}

const FooterButtons = ({
  isbn,
  title,
  author,
  imageUrl,
  link,
}: FooterButtonsProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleGoToBuy = () => {
    if (link) {
      window.open(link, '_blank'); // 링크로 이동
    } else {
      console.warn('구매 링크가 제공되지 않았습니다.');
    }
  };

  const handleAddToLibrary = () => {
    if (!isLoggedIn) {
      dispatch(
        showSnackbar({
          message: '로그인 후 이용해주세요.',
          severity: 'error',
        }),
      );
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <Stack direction="row" height="15%" borderTop="1px solid #e7e8e9">
      <Button onClick={handleGoToBuy} sx={bookDetailStyles.goToBuyButton}>
        사러 가기
      </Button>
      <Button
        onClick={handleAddToLibrary}
        sx={{ flex: 1, borderRadius: '0 0 8px 0' }}
      >
        내 서재에 담기
      </Button>
      {isLoggedIn && (
        <AddToLibraryModal
          isbn={isbn}
          title={title}
          author={author}
          imageUrl={imageUrl}
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />
      )}
    </Stack>
  );
};

export default FooterButtons;
