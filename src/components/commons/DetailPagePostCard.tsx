import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Button,
} from '@mui/material';

interface PostCardProps {
  title: string;
  description: string;
  userName: string;
  avatar: string;
}

const PostCard = ({
  title,
  description,
  userName,
  avatar,
}: PostCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e7e8e9',
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
              src={avatar}
              alt={userName}
              sx={{ width: 40, height: 40 }}
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
