import { Button, Stack } from '@mui/material';
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
    <Stack direction="row" spacing={1}>
      <Button
        variant={postType === '한줄평' ? 'contained' : 'outlined'}
        size="small"
        onClick={(e) =>
          onPostTypeChange(e, postType === '한줄평' ? '' : '한줄평')
        }
        sx={{
          fontSize: '12px',
          padding: '5px 10px',
          minWidth: '80px',
          borderRadius: '20px',
        }}
      >
        한줄평
      </Button>
      <Button
        variant={postType === '포스팅' ? 'contained' : 'outlined'}
        size="small"
        onClick={(e) =>
          onPostTypeChange(e, postType === '포스팅' ? '' : '포스팅')
        }
        sx={{
          fontSize: '12px',
          padding: '5px 10px',
          minWidth: '80px',
          borderRadius: '20px',
        }}
      >
        포스팅
      </Button>
    </Stack>
  );
};
