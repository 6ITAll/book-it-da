import { Box, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import React, { useState, useEffect, useCallback } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  isDialog?: boolean; // 상세 페이지인지 여부 체크
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
}

const StarRating = ({
  rating,
  onRatingChange,
  isDialog,
  openDialog,
}: StarRatingProps) => {
  const [localRating, setLocalRating] = useState(rating);

  // 부모에서 전달된 rating이 변경되면 내부 상태도 동기화
  useEffect(() => {
    setLocalRating(rating);
  }, [rating]);

  const handleStarClick = useCallback(
    (index: number) => {
      const newRating = index + 1;
      setLocalRating(newRating);

      onRatingChange(newRating);
      if (!isDialog && openDialog) {
        openDialog(true);
      }
    },
    [onRatingChange, isDialog, openDialog],
  );

  return (
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          key={index}
          onClick={() => handleStarClick(index)}
          sx={{
            cursor: 'pointer',
            color: index < localRating ? 'gold' : '#ccc',
          }}
        >
          {index < localRating ? (
            <StarIcon fontSize="large" />
          ) : (
            <StarOutlineIcon fontSize="large" />
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default StarRating;
