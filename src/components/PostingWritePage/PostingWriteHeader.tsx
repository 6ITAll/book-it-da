import { Box, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreatePostingMutation,
  useUpdatePostingMutation,
} from '@features/PostingWritePage/api/postingWriteApi';
import { Book } from '@shared/types/type';

interface PostingWriteHeaderProps {
  title: string;
  content: string;
  selectedBook: Book | null;
  isEditing: boolean;
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
  isEditing,
}: PostingWriteHeaderProps) => {
  const navigate = useNavigate();
  const { postingId } = useParams();
  // 임의의 아이디 값
  const userId = 3373;
  const [createPosting] = useCreatePostingMutation();
  const [updatePosting] = useUpdatePostingMutation();

  const handleSubmit = async () => {
    if (!selectedBook || !title || !content) {
      // 유효성 검사 실패 처리
      return;
    }

    const postData = {
      userId,
      book: selectedBook,
      title,
      content,
    };

    try {
      if (isEditing && postingId) {
        await updatePosting({
          postingId: Number(postingId),
          ...postData,
        }).unwrap();
      } else {
        await createPosting(postData).unwrap();
      }
      navigate('/');
    } catch (error) {
      console.error('포스팅 저장 실패:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
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
        <IconButton onClick={handleBack}>
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
