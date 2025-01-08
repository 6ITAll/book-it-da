import { Box, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useCreatePostingMutation } from '@features/PostingWritePage/api/postingWriteApi';
import { Book, User } from '@shared/types/type';
import { navigateBack } from '@shared/utils/navigation';
import { TEMP_SAVE_STORAGE_KEY } from 'src/constants/postingwrite';

interface PostingWriteHeaderProps {
  title: string;
  content: string;
  selectedBook: Book | null;
  user: Omit<User, 'isFollowing' | 'isFollower'>;
}

const styles = {
  postingHeader: {
    width: '100%',
    position: 'sticky',
    opacity: '0.9',
    top: 0,
    bgcolor: 'white',
    zIndex: 1000,
    borderBottom: '1px solid #eee',
    py: 2,
    px: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
};

const PostingWriteHeader = ({
  title,
  content,
  selectedBook,
  user,
}: PostingWriteHeaderProps) => {
  const navigate = useNavigate();
  const [createPosting] = useCreatePostingMutation();

  const handleSubmit = async () => {
    if (!selectedBook || !title || !content) {
      // 유효성 검사 실패 처리
      return;
    }

    try {
      await createPosting({
        book: selectedBook,
        title,
        content,
        user,
      }).unwrap();

      localStorage.removeItem(TEMP_SAVE_STORAGE_KEY);
      navigate('/');
    } catch (error) {
      console.error('포스팅 작성 실패:', error);
    }
  };

  return (
    <Box sx={styles.postingHeader}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <IconButton onClick={() => navigateBack(navigate)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          포스팅 작성
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedBook || !title || !content}
      >
        등록
      </Button>
    </Box>
  );
};

export default PostingWriteHeader;
