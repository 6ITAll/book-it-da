import { Box, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreatePostingMutation,
  useUpdatePostingMutation,
} from '@features/PostingWritePage/api/postingWriteApi';
import { Book } from '@shared/types/type';
import { navigateBack } from '@shared/utils/navigation';
import { postingWriteStyles } from './PostingWrite.styles';
import { TEMP_SAVE_STORAGE_KEY } from '@constants/postingWrite';

interface PostingWriteHeaderProps {
  title: string;
  content: string;
  selectedBook: Book | null;
  isEditing: boolean;
}

const PostingWriteHeader = ({
  title,
  content,
  selectedBook,
  isEditing,
}: PostingWriteHeaderProps) => {
  const navigate = useNavigate();
  const { postingId } = useParams();
  const [createPosting] = useCreatePostingMutation();
  const [updatePosting] = useUpdatePostingMutation();

  const handleSubmit = async () => {
    if (!selectedBook || !title || !content) {
      // 유효성 검사 실패 처리
      return;
    }

    const postData = {
      book: selectedBook,
      title,
      content,
    };

    try {
      if (isEditing && postingId) {
        await updatePosting({
          postingId,
          ...postData,
        }).unwrap();
      } else {
        await createPosting(postData).unwrap();
      }
      localStorage.removeItem(TEMP_SAVE_STORAGE_KEY);
      navigate('/');
    } catch (error) {
      console.error('포스팅 저장 실패:', error);
      // 에러 처리 (예: 사용자에게 에러 메시지 표시)
    }
  };

  return (
    <Box sx={postingWriteStyles.header}>
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
