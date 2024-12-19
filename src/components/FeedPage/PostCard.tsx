import { Box, Avatar, Button, Typography } from '@mui/material';

interface PostCardProps {
  title: string;
  description: string;
  imageUrl: string;
  userName: string;
  timeAgo: string;
  postType: string;
  feedType: string;
  bookTitle: string;
  bookAuthor: string;
}

const PostCard = ({
  title,
  description,
  imageUrl,
  userName,
  timeAgo,
  postType,
  feedType,
  bookTitle,
  bookAuthor,
}: PostCardProps): JSX.Element => {
  const isFollowing = feedType === '팔로잉';

  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ marginRight: '8px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" fontWeight="bold">
              {userName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#666',
              }}
            >
              <Typography variant="caption">{timeAgo}</Typography>
              <Typography variant="caption" sx={{ marginLeft: '8px' }}>
                {postType}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: isFollowing ? 'black' : 'primary',
            borderColor: isFollowing ? 'black' : 'primary',
            '&:hover': {
              borderColor: isFollowing ? 'black' : 'primary',
            },
          }}
        >
          {isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      </Box>

      {/* Card Content */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Image Section */}
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            objectPosition: 'top',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))',
            filter: 'brightness(0.7)',
          }}
        />
        {/* Text Content */}
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'auto',
            width: '100%',
            bottom: '33%',
            backgroundColor: 'rgba(255,255,255,0)',
            color: '#f5f5f5',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: '700' }}>
            {bookTitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '12px', fontWeight: '300' }}
          >
            {bookAuthor}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            textAlign: 'center',
            padding: '0 1rem',
            width: '100%',
            bottom: '0',
            zIndex: 2,
            color: '#333',
            boxSizing: 'border-box',
          }}
        >
          {postType === '한줄평' ? (
            <Typography variant="h6" fontWeight="bold" fontSize="17px">
              {description}
            </Typography>
          ) : (
            <>
              <Typography variant="h6" fontWeight="bold" fontSize="17px">
                {title}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      {postType === '포스팅' ? (
        <>
          <Typography
            variant="body2"
            sx={{
              height: '100px',
              padding: '1rem',
              backgroundColor: '#f5f5f5',
            }}
          >
            {description}
          </Typography>
        </>
      ) : (
        <></>
      )}

      {/* Card Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #ddd',
        }}
      >
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: '0px 0px 0px 8px',
            backgroundColor: 'transparent',
            color: '#333',
          }}
        >
          {/* 추후 MUI Icon으로 교체 */}♡ 좋아요
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: '0px 0px 8px 0px',
            backgroundColor: 'transparent',
            color: '#333',
          }}
        >
          책 보러가기
        </Button>
      </Box>
    </Box>
  );
};

export default PostCard;
