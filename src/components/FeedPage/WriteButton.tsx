import { useState, useCallback } from 'react';
import { Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import PostTypeSelectDialog from '@components/FeedPage/PostTypeSelectDialog/PostTypeSelectDialog';

const WriteButton = (): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleDialogOpen}
        endIcon={<CreateIcon />}
      >
        글쓰기
      </Button>
      <PostTypeSelectDialog
        dialogOpen={dialogOpen}
        setDialogOpen={handleDialogClose}
      />
    </>
  );
};

export default WriteButton;
