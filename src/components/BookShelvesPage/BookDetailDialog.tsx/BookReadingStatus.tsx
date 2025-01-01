import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DoneIcon from '@mui/icons-material/Done';
import Zoom from '@mui/material/Zoom';
import { styles } from './BookDetailDialog.styles';
import { ReadingStatusType } from '@shared/types/type';

interface ReadingStatusToggleProps {
  readingStatus: string | null;
  handleReadingStatus: (
    event: React.MouseEvent<HTMLElement>,
    newStatus: ReadingStatusType,
  ) => void;
}

const ReadingStatus = ({
  readingStatus,
  handleReadingStatus,
}: ReadingStatusToggleProps) => {
  return (
    <Box sx={styles.readingStatusBox}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '7px' }}>
        <AutoStoriesIcon fontSize="small" />
        <Typography sx={{ fontSize: '14px' }}>독서 상태</Typography>
      </Box>
      <ToggleButtonGroup
        value={readingStatus}
        exclusive
        onChange={handleReadingStatus}
        aria-label="독서 상태"
        sx={styles.readingStatus}
      >
        <Tooltip
          title="읽고 싶은 책"
          placement="bottom"
          slots={{ transition: Zoom }}
        >
          <ToggleButton value="want" aria-label="읽고 싶은 책">
            <BookmarkIcon sx={{ fontSize: '1.2rem' }} />
          </ToggleButton>
        </Tooltip>
        <Tooltip
          title="읽고 있는 책"
          placement="bottom"
          slots={{ transition: Zoom }}
        >
          <ToggleButton value="reading" aria-label="읽고 있는 책">
            <MenuBookIcon sx={{ fontSize: '1.2rem' }} />
          </ToggleButton>
        </Tooltip>
        <Tooltip
          title="완독한 책"
          placement="bottom"
          slots={{ transition: Zoom }}
        >
          <ToggleButton value="done" aria-label="완독한 책">
            <DoneIcon sx={{ fontSize: '1.2rem' }} />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ReadingStatus;
