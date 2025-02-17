import { useEffect, useState } from 'react';
import HybridDialog from '@components/commons/HybridDialog/HybridDialog';
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { UserInfo } from '@features/user/userSlice';
import {
  useAddBookMutation,
  useCreateBookshelfMutation,
  useGetBookshelvesQuery,
} from '@features/BookShelvesPage/api/bookShelvesApi';

import BookshelfCreate from '@components/BookDetailPage/BookshelfCreate';

interface AddToLibraryModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isbn: string;
}

const AddToLibraryModal = ({
  open,
  setOpen,
  isbn,
}: AddToLibraryModalProps): JSX.Element => {
  const [selectedBookshelf, setSelectedBookshelf] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const userInfo = useSelector(
    (state: RootState) => state.user.userInfo as UserInfo,
  );
  const { data: bookshelvesData, refetch } = useGetBookshelvesQuery(
    userInfo?.id || '',
    {
      skip: !userInfo?.id,
    },
  );
  const [createBookshelf] = useCreateBookshelfMutation();
  const [addBook] = useAddBookMutation();

  useEffect(() => {
    if (userInfo?.id) {
      setIsLoading(false);
    }
  }, [userInfo]);

  // 책 추가 함수
  const handleAddBook = async () => {
    if (selectedBookshelf) {
      try {
        await addBook({
          bookshelfId: selectedBookshelf,
          isbn,
        }).unwrap();
        setOpen(false);
      } catch (error) {
        console.error('책 추가 중 오류 발생:', error);
      }
    }
  };

  // 책장 추가 함수
  const handleOnAddBookshelf = async (
    newBookshelfName: string,
  ): Promise<void> => {
    if (newBookshelfName.trim()) {
      try {
        await createBookshelf({
          userId: userInfo.id,
          name: newBookshelfName.trim(),
        }).unwrap();
        await refetch();

        setIsCreating(false);
      } catch (error) {
        console.error('책장 추가 중 오류 발생:', error);
      }
    }
  };

  const contentNode = (
    <>
      {!isCreating ? (
        <Button
          onClick={() => setIsCreating(true)}
          sx={bookDetailStyles.addBookShelfButton}
        >
          + 책장 만들기
        </Button>
      ) : (
        <BookshelfCreate onAdd={handleOnAddBookshelf} />
      )}
      <Typography variant="body2" color="text.secondary" mt={2} mb={2}>
        책장을 선택하면 함께 담을 수 있어요
      </Typography>
      <RadioGroup
        value={selectedBookshelf}
        onChange={(e) => setSelectedBookshelf(e.target.value)}
      >
        {(bookshelvesData?.bookshelves ?? []).length > 0 ? (
          bookshelvesData?.bookshelves?.map((shelf) => (
            <FormControlLabel
              key={shelf.id}
              value={shelf.id}
              control={<Radio />}
              label={shelf.name}
              sx={{
                '& .MuiTypography-root': { fontSize: 14 },
              }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            책장이 없습니다. 새 책장을 만들어주세요.
          </Typography>
        )}
      </RadioGroup>
    </>
  );

  if (isLoading) {
    return <></>;
  }

  return (
    <HybridDialog
      title="내 서재에 담기"
      contentNode={contentNode}
      action="담기"
      onActionClick={handleAddBook}
      open={open}
      setOpen={setOpen}
      maxWidth="xs"
    />
  );
};

export default AddToLibraryModal;
