import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FeedType } from '@shared/types/type';

interface FeedTypeFilterProps {
  feedType: FeedType;
  onFeedTypeChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: FeedType | null,
  ) => void;
}

export const FeedTypeFilter = ({
  feedType,
  onFeedTypeChange,
}: FeedTypeFilterProps) => {
  return (
    <ToggleButtonGroup value={feedType} exclusive onChange={onFeedTypeChange}>
      <ToggleButton value="추천" sx={{ padding: '5px 10px', fontSize: '12px' }}>
        추천
      </ToggleButton>
      <ToggleButton
        value="팔로워"
        sx={{ padding: '5px 10px', fontSize: '12px' }}
      >
        팔로워
      </ToggleButton>
      <ToggleButton
        value="팔로잉"
        sx={{ padding: '5px 10px', fontSize: '12px' }}
      >
        팔로잉
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
