import { Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styles } from './PostTypeSelectDialog.styles';
import { PostType } from '@shared/types/type';
import { POST_TYPE_OPTIONS } from 'src/constants';

interface PostTypeButtonProps {
  icon: (typeof POST_TYPE_OPTIONS)[0]['icon'];
  label: string;
  type: PostType;
  onSelect: (type: PostType) => void;
}

const PostTypeButton = ({
  icon: Icon,
  label,
  type,
  onSelect,
}: PostTypeButtonProps) => (
  <Button
    variant="outlined"
    fullWidth
    startIcon={<Icon />}
    endIcon={<ChevronRightIcon />}
    onClick={() => onSelect(type)}
    sx={styles.postTypeButton}
  >
    {label}
  </Button>
);

export default PostTypeButton;
