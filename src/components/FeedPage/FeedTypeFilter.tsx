import { Tab, Tabs } from '@mui/material';
import { FeedType } from '@shared/types/type';
import { FEED_TYPE_TABS } from 'src/constants';
import { styles } from './FeedTypeFilter.styles';

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
      sx={styles.feedTypeFilter}
    >
      {FEED_TYPE_TABS.map(({ label, value }) => (
        <Tab key={value} label={label} value={value} />
      ))}
    </Tabs>
  );
};
