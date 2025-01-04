import { Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styles } from './PostTypeSelectDialog.styles';
import { PostType } from '@shared/types/type';
import { POST_TYPE_OPTIONS } from 'src/constants';
import { useNavigate } from 'react-router-dom';

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
}: PostTypeButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === '포스팅') {
      navigate('/posting/write');
    } else {
      onSelect(type);
    }
  };

  return (
    <Button
      variant="outlined"
      fullWidth
      startIcon={<Icon />}
      endIcon={<ChevronRightIcon />}
      onClick={handleClick}
      sx={styles.postTypeButton}
    >
      {label}
    </Button>
  );
};

export default PostTypeButton;
