import { Bookshelf } from '@shared/types/type';
import BookshelfCard from './BookshelfCard';
import { Stack } from '@mui/material';

const LibraryTabPanel = () => {
  const bookShelves: Bookshelf[] = [];

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      useFlexGap
      justifyContent="flex-start"
      spacing={3}
    >
      {bookShelves.map((shelf) => (
        <BookshelfCard key={shelf.id} shelf={shelf} />
      ))}
    </Stack>
  );
};

export default LibraryTabPanel;
