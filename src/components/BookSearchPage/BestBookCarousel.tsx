/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useGetBestBooksQuery } from '@features/BookSearchPage/api/bestBookGetApi';
import Carousel from '@components/commons/Carousel';
import BestBookCard from '@components/BookSearchPage/BestBookCard';

const BestBookCarousel = (): JSX.Element => {
  const { data } = useGetBestBooksQuery();

  // 주차 정보 추출 (현재 날짜 기준)
  const currentDate = dayjs();
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month() + 1; // day.js는 0부터 시작
  const firstDayOfMonth = currentDate.startOf('month');
  const weekNumber = Math.ceil(
    (currentDate.date() + firstDayOfMonth.day()) / 7,
  );

  return (
    <>
      <Typography
        css={css`
          opacity: 0.5;
          margin-bottom: 10px;
          font-size: 15px;
        `}
        gutterBottom
      >
        {`${currentYear}년 ${currentMonth}월 ${weekNumber}주차 기준`}
      </Typography>
      <Carousel>
        {data?.item?.map((book) => (
          <BestBookCard
            key={book.isbn}
            isbn={book.isbn}
            image={book.cover}
            title={book.title}
          />
        ))}
      </Carousel>
    </>
  );
};

export default BestBookCarousel;
