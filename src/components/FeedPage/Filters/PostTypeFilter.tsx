import { Button, Stack } from '@mui/material';
import { PostType } from '@shared/types/type';
import { styles } from './PostTypeFilter.styles';

interface PostTypeFilterProps {
  postType: PostType | '';
  onPostTypeChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: PostType | '',
  ) => void;
}

const POST_TYPES = ['한줄평', '포스팅'] as const;

export const PostTypeFilter = ({
  postType,
  onPostTypeChange,
}: PostTypeFilterProps) => {
  return (
    <Stack direction="row" spacing={1}>
      {POST_TYPES.map((type) => (
        <Button
          key={type}
          variant={postType === type ? 'contained' : 'outlined'}
          size="small"
          onClick={(e) => onPostTypeChange(e, postType === type ? '' : type)}
          sx={styles.filterButton}
        >
          {type}
        </Button>
      ))}
    </Stack>
  );
};
