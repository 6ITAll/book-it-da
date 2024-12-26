import { Box, Typography, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

interface StarRatingBoxProps {
  initialRating?: number; // 기본 별점 (선택사항)
  onRatingChange?: (rating: number) => void; // 별점 변경 콜백
}

const StarRatingBox = ({
  initialRating = 0,
  onRatingChange,
}: StarRatingBoxProps): JSX.Element => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
    onRatingChange?.(index + 1); // 부모로 별점 값을 전달
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        border: '1px solid #e7e8e9',
        borderRadius: '8px',
        marginBottom: '1.5rem',
      }}
    >
      <Stack direction="row" spacing={1}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Box
            key={index}
            onClick={() => handleStarClick(index)}
            sx={{
              cursor: 'pointer',
              color: index < rating ? 'gold' : '#ccc',
            }}
          >
            {index < rating ? (
              <StarIcon fontSize="large" />
            ) : (
              <StarOutlineIcon fontSize="large" />
            )}
          </Box>
        ))}
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginTop: '0.5rem' }}
      >
        이 책은 어떠셨나요? 별점을 남겨주세요
      </Typography>
    </Box>
  );
};

export default StarRatingBox;
