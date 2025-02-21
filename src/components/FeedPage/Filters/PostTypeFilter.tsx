import { Button, Stack, useTheme } from '@mui/material';
import { PostType } from '@shared/types/type';
import styles from './PostTypeFilter.styles';

interface PostTypeFilterProps {
  postType: PostType;
  onPostTypeChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: PostType,
  ) => void;
}

const POST_TYPES = ['한줄평', '포스팅'] as const;

const PostTypeFilter = ({
  postType,
  onPostTypeChange,
}: PostTypeFilterProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={1}>
      {POST_TYPES.map((type) => (
        <Button
          key={type}
          variant={postType === type ? 'contained' : 'outlined'}
          size="small"
          onClick={(e) =>
            onPostTypeChange(e, postType === type ? '선택안함' : type)
          }
          sx={styles.filterButton(theme, postType === type)}
        >
          {type}
        </Button>
      ))}
    </Stack>
  );
};

export default PostTypeFilter;
