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

interface ReviewCardProps {
  username: string;
  date: string;
  content: string;
  likes: number;
}

const ReviewCard = ({
  username,
  date,
  content,
  likes,
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
