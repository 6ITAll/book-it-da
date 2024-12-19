/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useGetBestBooksQuery } from '@features/BookSearchPage/api/bestBookGetApi';
import Carousel from '@components/commons/Carousel';
import BestBookCard from '@components/BookSearchPage/BestBookCard';

const BestBookCarousel = (): JSX.Element => {
  const { data, isLoading, error } = useGetBestBooksQuery();
  // 주차 정보 추출 (현재 날짜 기준)
  const currentDate = dayjs();
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month() + 1; // day.js는 0부터 시작
  const firstDayOfMonth = currentDate.startOf('month');
  const weekNumber = Math.ceil(
    (currentDate.date() + firstDayOfMonth.day()) / 7,
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생하였습니다.</div>;

  return (
    <div>
      <Typography
        css={css`
          opacity: 0.5;
          margin-bottom: 10px;
          font-size: 12px;
        `}
        gutterBottom
      >
        {`${currentYear}년 ${currentMonth}월 ${weekNumber}주차 기준`}
      </Typography>
      <Carousel>
        {data?.item?.map((book) => (
          <BestBookCard
            key={book.itemId}
            image={book.cover}
            onClick={() => console.log('상세 페이지 이동')}
            title={book.title}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default BestBookCarousel;
