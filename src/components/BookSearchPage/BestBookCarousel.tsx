import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useGetBestBooksQuery } from '@features/BookSearchPage/api/bestBookGetApi';
import Carousel from '@components/commons/Carousel';
import BestBookCard from '@components/BookSearchPage/BestBookCard';
import { renderBestBookSkeletons } from '@components/BookSearchPage/BookSearchSkeleton';

const BestBookCarousel = (): JSX.Element => {
  const { data, isLoading } = useGetBestBooksQuery();

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
        sx={{ opacity: '0.5', marginBottom: '10px', fontSize: '15px' }}
        gutterBottom
      >
        {`${currentYear}년 ${currentMonth}월 ${weekNumber}주차 기준`}
      </Typography>

      {/* 조건부 렌더링 */}
      {isLoading ? (
        renderBestBookSkeletons(4) // 스켈레톤 4개 생성
      ) : (
        <Carousel>
          {data?.item?.map((book) => (
            <BestBookCard
              key={book.itemId}
              itemId={book.itemId}
              image={book.cover}
              title={book.title}
            />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default BestBookCarousel;
