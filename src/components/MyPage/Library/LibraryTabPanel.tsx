import BookshelfCard from './BookshelfCard';
import { Stack, Typography } from '@mui/material';
import { useGetLibraryQuery } from '@features/MyPage/api/libraryApi';

interface LibraryTabPanelProps {
  userId: string;
}

const LibraryTabPanel = ({ userId }: LibraryTabPanelProps) => {
  const { data: bookShelves, error, isLoading } = useGetLibraryQuery(userId);

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography>에러 발생: {JSON.stringify(error)}</Typography>;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      useFlexGap
      justifyContent="flex-start"
      spacing={3}
    >
      {bookShelves?.map((shelf) => (
        <BookshelfCard key={shelf.id} shelf={shelf} />
      ))}
    </Stack>
  );
};

export default LibraryTabPanel;
