import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  SxProps,
  Stack,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People'; // 사람 아이콘 추가

interface CommonBookCardProps {
  image: string; // 이미지
  title?: string; // 제목
  author?: string; // 저자
  customerReviewRank?: number; // 0~10점 값
  priceStandard?: number; // 정가 가격
  ratingCount?: number; // 평가 인원 수
  onClick?: () => void; // 상세페이지 이동 을 위한 onClick 함수 생성
  sx?: SxProps; // MUI의 sx 스타일 속성
}

const CommonBookCard = ({
  image,
  title,
  author,
  customerReviewRank,
  priceStandard,
  ratingCount,
  sx,
  onClick,
}: CommonBookCardProps): JSX.Element => {
  const convertedRating = customerReviewRank ? customerReviewRank / 2 : 0; // 10점 만점 -> 5점 만점으로 변환
  const displayRating = Number.isInteger(convertedRating)
    ? convertedRating.toFixed(0) // 정수일 경우 소수점 제거
    : convertedRating.toFixed(1); // 소수점 1자리 유지

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        ...sx,
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title || '책 이미지'}
        sx={{
          height: 160, // 고정된 높이
          objectFit: 'contain', // 이미지 'contain' 방식으로 표시
          objectPosition: 'center', // 이미지 중심 정렬
          borderRadius: '8px 8px 0 0', // 상단 좌우 둥근 테두리
        }}
      />
      <CardContent>
        {title && (
          <Typography
            variant="body1"
            fontWeight="bold"
            gutterBottom
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {title}
          </Typography>
        )}
        {author && (
          <Typography
            variant="body2"
            sx={{
              color: 'grey.700',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
            }}
          >
            {author}
          </Typography>
        )}
        {customerReviewRank !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Rating
              value={convertedRating}
              readOnly
              precision={0.5} // 반점 단위로 별 표시
              max={5}
              size="small"
              sx={{ color: '#FFD700', marginRight: 1 }} // 별 색깔 노란색
            />
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {displayRating}
              </Typography>
              {ratingCount !== undefined && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center', // 세로 가운데 정렬
                    justifyContent: 'flex-start', // 텍스트와 아이콘 정렬
                    color: 'grey.500',
                  }}
                >
                  <PeopleIcon sx={{ fontSize: '12px', marginRight: 0.5 }} />
                  <Typography noWrap variant="body2">
                    {ratingCount}명
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        )}
        {priceStandard !== undefined && (
          <Typography
            variant="body2"
            sx={{
              marginTop: 1,
              color: 'secondary.main',
            }}
          >
            {priceStandard.toLocaleString()} 원
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CommonBookCard;
