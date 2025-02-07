import { Box, Tabs, Tab } from '@mui/material';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
import { BOOK_TABS, BookTabType } from './types';

interface DetailsNavbarProps {
  currentTab: BookTabType;
  onTabChange: (tab: BookTabType) => void;
}

const BookDetailsNavbar = ({
  currentTab,
  onTabChange,
}: DetailsNavbarProps): JSX.Element => {
  return (
    <Box sx={bookDetailStyles.bookDetailsNavbarBox}>
      <Tabs
        variant="fullWidth"
        value={currentTab}
        onChange={(_, newValue) => onTabChange(newValue as BookTabType)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={BOOK_TABS.INTRODUCE} value={BOOK_TABS.INTRODUCE} />
        <Tab label={BOOK_TABS.FEED} value={BOOK_TABS.FEED} />
      </Tabs>
    </Box>
  );
};

export default BookDetailsNavbar;
