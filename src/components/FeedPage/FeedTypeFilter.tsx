import { Tab, Tabs } from '@mui/material';
import { FeedType } from '@shared/types/type';

interface FeedTypeFilterProps {
  feedType: FeedType;
  onFeedTypeChange: (_: React.SyntheticEvent, newValue: FeedType) => void;
}

export const FeedTypeFilter = ({
  feedType,
  onFeedTypeChange,
}: FeedTypeFilterProps) => {
  return (
    <Tabs
      value={feedType}
      onChange={onFeedTypeChange}
      sx={{
        minHeight: '36px',
        '& .MuiTab-root': {
          minHeight: '36px',
          fontSize: '12px',
          minWidth: '80px',
          padding: '5px 10px',
        },
      }}
    >
      <Tab label="추천" value="추천" />
      <Tab label="팔로워" value="팔로워" />
      <Tab label="팔로잉" value="팔로잉" />
    </Tabs>
  );
};
