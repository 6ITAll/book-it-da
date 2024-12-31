import { Box, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

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
  const handleStarClick = (index: number) => {
    onRatingChange(index + 1);
    // 상세페이지에서 클릭할 경우 다이얼로그 열기
    if (!isDialog && openDialog) {
      openDialog(true);
    }
  };

  return (
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
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
  );
};

export default StarRating;
