import { Box, TextField, Typography } from '@mui/material';
import { REVIEW_DIALOG } from 'src/constants';

interface ReviewTextFieldProps {
  review: string;
  setReview: (value: string) => void;
}

const ReviewTextField = ({
  review,
  setReview,
}: ReviewTextFieldProps): JSX.Element => (
  <Box position="relative" sx={{ width: '100%' }}>
    <TextField
      fullWidth
      multiline
      label="한줄평"
      variant="outlined"
      placeholder="한줄평을 입력하세요"
      value={review}
      onChange={(e) => {
        if (e.target.value.length <= REVIEW_DIALOG.ONE_LINE_REVIEW_MAX_LENGTH) {
          setReview(e.target.value);
        }
      }}
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

export default ReviewTextField;
