import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { navigateToUserPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

interface ReviewCardProps {
  username: string;
  date: string;
  content: string;
  likes: number;
  rating: number;
  isbn: string;
}

const ReviewCard = ({
  username,
  date,
  content,
  likes,
  rating,
}: ReviewCardProps): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Card
      sx={{
        border: theme.palette.border.dark,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            onClick={() => navigateToUserPage(navigate, username)}
            sx={{ cursor: 'pointer' }}
          >
            {username.charAt(0)}
          </Avatar>
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
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            '&:hover': {
              bgcolor: 'transparent',
            },
          }}
        >
          좋아요 {likes}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
