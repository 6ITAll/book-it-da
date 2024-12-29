import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FeedType, PostType } from '@shared/types/type';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface PostCardProps {
  title: string;
  description: string;
  imageUrl: string;
  userName: string;
  timeAgo: string;
  postType: PostType;
  feedType: FeedType;
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
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '100%',
        aspectRatio: 'auto',
        bgcolor: '#fafafa',
        borderRadius: '8px',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardHeader
        sx={{
          display: 'flex',
          height: '10%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem',
          '& .MuiCardHeader-action': {
            margin: 0,
            alignSelf: 'center',
          },
        }}
        avatar={<Avatar />}
        action={
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: isFollowing ? 'black' : 'primary',
              borderColor: isFollowing ? 'black' : 'primary',
              mb: '0',
            }}
          >
            {isFollowing ? '팔로잉' : '팔로우'}
          </Button>
        }
        title={
          <Typography variant="body2" fontWeight="bold">
            {userName}
          </Typography>
        }
        subheader={
          <Box
            sx={{
              display: 'flex',
              fontSize: '11px',
              color: '#666',
              gap: '5px',
            }}
          >
            <Typography variant="caption" sx={{ fontSize: '11px' }}>
              {postType}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '11px' }}>
              •
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '11px' }}>
              {timeAgo}
            </Typography>
          </Box>
        }
      />
      {/* 책 사진 */}
      <Box
        sx={{
          position: 'relative',
          height: '60%',
          width: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box',
          backgroundColor: '#000',
          zIndex: 1,
        }}
      >
        {/* 뒷배경 */}
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(10px) brightness(0.5)',
            transform: 'scale(1.1)',
          }}
        />

        {/* 책 표지 */}
        <Box
          sx={{
            position: 'relative',
            width: '70%',
            height: '100%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            alt={title}
            sx={{
              width: '80%',
              height: '80%',
              objectFit: 'contain',
              aspectRatio: '2/3',
              zIndex: 3,
              transform: 'scale(0.7)',
            }}
          />
        </Box>
      </Box>
      {/* 포스팅 내용 */}
      <CardContent
        sx={{
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          padding: '1rem 1rem 0.5rem 1rem',
          height: '20%',
          borderRadius: '8px 8px 0px 0px',
          marginTop: '-15px',
          position: 'relative',
          backgroundColor: '#fafafa',
          zIndex: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* 책 제목과 저자 정보 또는 포스팅 제목 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {postType === '한줄평' ? (
            <>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#333',
                  width: '100%',
                  textAlign: 'center',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {bookTitle}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '12px', fontWeight: '300' }}
              >
                {bookAuthor}
              </Typography>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#333',
                width: '100%',
                textAlign: 'center',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {title}
            </Typography>
          )}
        </Box>
        {/* 한줄평 또는 포스팅 내용 */}
        <Box
          sx={{
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {postType === '한줄평' && (
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize="18px"
              align="center"
              sx={{
                padding: '1rem 0',
                width: '100%',
                height: '100%',
                color: '#333',
                boxSizing: 'border-box',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
            >
              {`"${title}"`}
            </Typography>
          )}
          {postType === '포스팅' && (
            <Typography
              variant="body2"
              fontSize="13px"
              sx={{
                height: 'auto',
                padding: '0.25rem 0.5rem',
                color: '#333',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                wordBreak: 'break-all',
                lineHeight: '20px',
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          padding: '0',
          height: '10%',
          borderTop: '1px solid #ddd',
          gap: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          boxSizing: 'border-box',
        }}
      >
        <Button
          fullWidth
          startIcon={<FavoriteBorderIcon />}
          sx={{
            padding: '0.7rem 0',
            width: '100%',
            height: '100%',
            borderRadius: '0px 0px 0px 8px',
            borderRight: '1px solid #ddd',
            bgcolor: 'transparent',
            color: '#333',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              bgcolor: '#f0f0f0',
            },
          }}
        >
          좋아요
        </Button>
        <Button
          fullWidth
          startIcon={<MenuBookIcon />}
          sx={{
            padding: '0.7rem 0',
            width: '100%',
            height: '100%',
            borderRadius: '0px 0px 8px 0px',
            bgcolor: 'transparent',
            color: '#333',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              bgcolor: '#f0f0f0',
            },
          }}
        >
          책 보러가기
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
