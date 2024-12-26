import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Box,
  Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

interface ReviewCardProps {
  username: string;
  date: string;
  content: string;
  likes: number;
  rating: number; // 별점 추가
}

const ReviewCard = ({
  username,
  date,
  content,
  likes,
  rating,
}: ReviewCardProps): JSX.Element => {
  return (
    <Card sx={{ boxShadow: 'none' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar>{username.charAt(0)}</Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          </Box>
        </Stack>

        {/* 별점 표시 */}
        <Stack direction="row" spacing={0.5} sx={{ marginTop: '0.5rem' }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Box key={index} sx={{ color: index < rating ? 'gold' : '#ccc' }}>
              {index < rating ? (
                <StarIcon fontSize="small" />
              ) : (
                <StarOutlineIcon fontSize="small" />
              )}
            </Box>
          ))}
        </Stack>

        <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
          {content}
        </Typography>

        <Button
          size="small"
          startIcon={<FavoriteBorderIcon />}
          sx={{
            marginTop: '0.5rem',
            color: '#555',
          }}
        >
          좋아요 {likes}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
