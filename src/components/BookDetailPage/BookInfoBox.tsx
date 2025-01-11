import { Box, Typography, Rating, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
interface BookInfoBoxProps {
  title: string;
  subTitle: string;
  author: string;
  categoryName: string;
  pubDate: string;
  customerReviewRank: number;
  ratingCount: number;
}

const BookInfoBox = ({
  title,
  subTitle,
  author,
  categoryName,
  pubDate,
  customerReviewRank,
  ratingCount,
}: BookInfoBoxProps): JSX.Element => {
  const convertedRating = customerReviewRank ? customerReviewRank / 2 : 0;
  const displayRating = customerReviewRank
    ? (customerReviewRank / 2).toFixed(1)
    : '0.0';
  return (
    <Box>
      <Typography variant="h2" fontWeight="bold" sx={{ mb: '1rem' }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: '1rem' }}>
        {subTitle}
      </Typography>
      <Typography variant="h6" sx={{ mb: '1rem' }}>
        {author}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: '1rem' }}>
        {categoryName} · {pubDate}
      </Typography>
      {/* 별점, 점수, 평가자 수 */}
      {customerReviewRank !== undefined && (
        <Box sx={bookDetailStyles.ratingBox}>
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
            sx={bookDetailStyles.scoreAndReviewStack}
          >
            <Typography variant="body2" fontWeight="bold">
              {displayRating}
            </Typography>
            {ratingCount !== undefined && (
              <Box sx={bookDetailStyles.iconAndReviewerBox}>
                <PeopleIcon sx={{ fontSize: '12px', marginRight: 0.5 }} />
                <Typography noWrap variant="body2">
                  {ratingCount}명
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default BookInfoBox;
