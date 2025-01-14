import { Button, Stack, useTheme } from '@mui/material';
import { PostType } from '@shared/types/type';
import styles from './PostTypeFilter.styles';

interface PostTypeFilterProps {
  postType: PostType | null;
  onPostTypeChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: PostType | null,
  ) => void;
}

const POST_TYPES = ['한줄평', '포스팅'] as const;

const PostTypeFilter = ({
  postType,
  onPostTypeChange,
}: PostTypeFilterProps): JSX.Element => {
  const theme = useTheme(); // 현재 테마 가져오기
  return (
    <Stack direction="row" spacing={1}>
      {POST_TYPES.map((type) => (
        <Button
          key={type}
          variant={postType === type ? 'contained' : 'outlined'}
          size="small"
          onClick={(e) => onPostTypeChange(e, postType === type ? null : type)}
          sx={styles.filterButton(theme, postType === type)} // isSelected 상태 전달
        >
          {type}
        </Button>
      ))}
    </Stack>
  );
};

export default PostTypeFilter;
