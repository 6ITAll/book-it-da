// 추후 공통 컴포넌트로 교체 => 리팩토링 불필요
// 현상님이 만드신 공통 컴포넌트 참고
import {
  Card,
  CardContent,
  Stack,
  Avatar,
  Typography,
  Button,
} from '@mui/material';

interface OtherPostingCardProps {
  post: {
    title: string;
    content: string;
    user: {
      name: string;
      avatarUrl: string;
    };
    book?: {
      author?: string;
    };
  };
}

const OtherPostingCard = ({ post }: OtherPostingCardProps) => (
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
        {post.title}
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
        {post.content}
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
            src={post.user.avatarUrl}
            alt={post.user.name}
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="body2" fontWeight="bold">
            {post.book?.author || post.user.name}
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

export default OtherPostingCard;
