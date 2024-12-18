/** @jsxImportSource @emotion/react */
import { Box, Typography } from '@mui/material';
import { css } from '@emotion/react';

interface BestBookCardProps {
  image: string;
  link: string;
  title?: string; // 제목 추가
}

const BestBookCard = ({
  image,
  link,
  title,
}: BestBookCardProps): JSX.Element => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      css={css`
        display: block;
        text-decoration: none;
        color: inherit;
      `}
    >
      <Box
        css={css`
          width: 140px;
          height: 200px;
          margin: 0 auto;
          border-radius: 8px;
          overflow: hidden;
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
          }
        `}
      >
        <img
          src={image}
          alt="Best Seller"
          css={css`
            width: 100%;
            height: 100%;
            object-fit: cover;
          `}
        />
      </Box>
      {title && (
        <Typography
          variant="body2"
          textAlign="center"
          css={css`
            padding: 20px;
            color: #333;
          `}
        >
          {title}
        </Typography>
      )}
    </a>
  );
};

export default BestBookCard;
