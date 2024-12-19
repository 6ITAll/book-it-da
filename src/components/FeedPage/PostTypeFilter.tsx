import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { PostType } from '@shared/types/type';

interface PostTypeFilterProps {
  postType: PostType | '';
  onPostTypeChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: PostType | '',
  ) => void;
}

export const PostTypeFilter = ({
  postType,
  onPostTypeChange,
}: PostTypeFilterProps) => {
  return (
    <ToggleButtonGroup value={postType} exclusive onChange={onPostTypeChange}>
      <ToggleButton
        value="한줄평"
        sx={{ padding: '5px 10px', fontSize: '12px' }}
      >
        한줄평
      </ToggleButton>
      <ToggleButton
        value="포스팅"
        sx={{ padding: '5px 10px', fontSize: '12px' }}
      >
        포스팅
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
