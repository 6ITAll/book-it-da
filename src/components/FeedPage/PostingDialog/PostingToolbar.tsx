import { Box, Button, Divider, Stack } from '@mui/material';
import { styles } from './PostingDialog.styles';

interface PostingToolbarProps {
  handleMaterialClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const PostingToolbar = ({ handleMaterialClick }: PostingToolbarProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={styles.postingToolbar}
    >
      <Box sx={styles.postingSaveBox}>
        <Button size="small" onClick={() => {}} sx={styles.postingSaveButton}>
          저장
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button size="small" onClick={() => {}} sx={styles.postingLoadButton}>
          0
        </Button>
      </Box>
      <Button
        size="small"
        onClick={handleMaterialClick}
        sx={styles.postingMaterialButton}
      >
        글감
      </Button>
    </Stack>
  );
};

export default PostingToolbar;
