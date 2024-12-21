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
  isDetail: boolean;
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
  isDetail,
}: PostCardProps): JSX.Element => {
  const isFollowing = feedType === '팔로잉';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
        width: '100%',
        aspectRatio: isDetail ? 'auto' : '2/3',
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
          isDetail && (
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
          )
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
        }}
      >
        <CardMedia
          component="img"
          height={isDetail ? '200' : '100%'}
          image={imageUrl}
          alt={title}
          sx={{
            objectFit: 'cover',
            objectPosition: 'top',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0))',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0))',
            filter: 'brightness(0.7)',
          }}
        />
        {/* 책 제목과 저자 */}
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            bottom: '10px',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: '19px', fontWeight: '700', color: '#333' }}
          >
            {bookTitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '12px', fontWeight: '300', color: '#333' }}
          >
            {bookAuthor}
          </Typography>
        </Box>
      </Box>
      {/* 포스팅 내용 */}
      <CardContent sx={{ padding: '0', height: '20%' }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          fontSize="18px"
          align={
            isDetail ? (postType === '한줄평' ? 'center' : 'left') : 'center'
          }
          sx={{
            padding: isDetail
              ? postType === '한줄평'
                ? '1rem 0'
                : '0.3rem 0.5rem'
              : '1rem 0',
            width: '100%',
            height: '100%',
            color: '#333',
            boxSizing: 'border-box',
          }}
        >
          {postType === '한줄평' ? `"${title}"` : title}
        </Typography>
        {postType === '포스팅' && isDetail && (
          <Typography
            variant="body2"
            fontSize="13px"
            sx={{
              height: '80px',
              padding: '0.25rem 0.5rem',
              color: '#333',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-all',
              lineHeight: '20px',
            }}
          >
            {description}
          </Typography>
        )}
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
          sx={{
            padding: '0.7rem 0',
            width: '100%',
            height: '100%',
            borderRadius: '0px 0px 0px 8px',
            borderRight: '1px solid #ddd',
            bgcolor: 'transparent',
            color: '#333',
            gap: '5px',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              bgcolor: '#f0f0f0',
            },
          }}
        >
          <FavoriteBorderIcon fontSize="small" /> 좋아요
        </Button>
        <Button
          fullWidth
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
