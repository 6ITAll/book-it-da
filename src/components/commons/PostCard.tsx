import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Button,
  useTheme,
} from '@mui/material';
import { navigateToUserPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  title: string;
  description: string;
  userName: string;
  avatar: string;
  userId: string;
}

const PostCard = ({
  title,
  description,
  userName,
  avatar,
  userId,
}: PostCardProps): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: '12px',
        border: theme.palette.border.dark,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          gutterBottom
          sx={{ marginBottom: '1rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ borderTop: '1px solid #e7e8e9', paddingTop: '1rem' }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              onClick={() => navigateToUserPage(navigate, userId)}
              src={avatar}
              alt={userName}
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
            />
            <Typography variant="body2" fontWeight="bold">
              {userName}
            </Typography>
          </Stack>
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '16px',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            팔로우
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard;
