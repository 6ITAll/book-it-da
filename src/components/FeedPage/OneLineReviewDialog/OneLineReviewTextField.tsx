import { Box, TextField, Typography } from '@mui/material';
import { REVIEW_DIALOG } from 'src/constants';
import { useState, ChangeEvent } from 'react';
interface ReviewTextFieldProps {
  // 부모에서 전달받은 inputRef를 내부 TextField에 연결합니다.
  inputRef?: React.Ref<HTMLInputElement>;
}

const ReviewTextField = ({ inputRef }: ReviewTextFieldProps): JSX.Element => {
  // 내부에서 리뷰 입력값을 관리
  const [review, setReview] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= REVIEW_DIALOG.ONE_LINE_REVIEW_MAX_LENGTH) {
      setReview(newValue);
    }
  };

  return (
    <Box position="relative" sx={{ width: '100%' }}>
      <TextField
        fullWidth
        multiline
        label="한줄평"
        variant="outlined"
        placeholder="한줄평을 입력하세요"
        value={review}
        onChange={handleChange}
        // 부모에서 전달받은 ref를 MUI TextField의 inputRef에 연결합니다.
        inputRef={inputRef}
        minRows={12}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            height: '200px',
            '& textarea': {
              height: '100% !important',
            },
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: '8px',
          right: '14px',
          color: 'text.secondary',
        }}
      >
        {review.length}/{REVIEW_DIALOG.ONE_LINE_REVIEW_MAX_LENGTH}
      </Typography>
    </Box>
  );
};

export default ReviewTextField;
