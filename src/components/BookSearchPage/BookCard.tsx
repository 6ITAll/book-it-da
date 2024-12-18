/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography, Rating, Stack } from '@mui/material';

interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  customerReviewRank: number;
  priceStandard: number;
  link: string; // 필수 link 속성 추가
}

const BookCard = ({
  title,
  author,
  cover,
  customerReviewRank,
  priceStandard,
  link,
}: BookCardProps): JSX.Element => {
  return (
    <Box
      component="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      css={css`
        display: flex;
        flex-direction: column;
        width: 150px;
        height: 100%;
        padding: 16px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        transition: box-shadow 0.3s ease;
        &:hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}
    >
      <img
        src={cover}
        alt={title}
        css={css`
          width: 100%;
          height: 50%;
          object-fit: cover;
          border-radius: 4px;
        `}
      />
      <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
        <Stack direction="column" spacing={0.5}>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {author}
          </Typography>
          <Stack direction="row">
            <Rating
              value={customerReviewRank}
              readOnly
              precision={1}
              max={1}
              size="small"
            />
            <Typography variant="body2" fontWeight="bold">
              {customerReviewRank}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              css={css`
                margin: 0 8px;
              `}
            >
              |
            </Typography>
            <Typography variant="body2">
              {priceStandard ? priceStandard.toLocaleString() : 0} 원
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BookCard;
