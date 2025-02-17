import { Container } from '@mui/material';
import { useFetchBookDetailQuery } from '@features/BookSearchPage/api/bookDetailApi';
import { useParams } from 'react-router-dom';
import BookDetailSection from '@components/BookDetailPage/BookDetailSection';
import BookDetailContent from '@components/BookDetailPage/BookDetailContent';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
import { useGetBookReaderStatsQuery } from '@features/BookDetailPage/api/readerStatsApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  clearReaderStats,
  defaultReaderStats,
  setReaderStats,
} from '@features/BookDetailPage/slice/readerStatsSlice';
import { useEffect } from 'react';

const BookDetailPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { isbn } = useParams<{ isbn: string }>();
  const { data: bookInfo, isLoading: bookInfoLoading } =
    useFetchBookDetailQuery({
      isbn: isbn!,
    });
  const { data: readerStatsData, isLoading: readerStatsLoading } =
    useGetBookReaderStatsQuery({
      isbn: isbn || '',
    });
  const readerStats = useSelector((state: RootState) => state.readerStats);

  useEffect(() => {
    if (readerStatsData) {
      dispatch(setReaderStats(readerStatsData));
    }
    return () => {
      dispatch(clearReaderStats());
    };
  }, [readerStatsData, dispatch]);

  return (
    <Container maxWidth="lg" disableGutters sx={bookDetailStyles.container}>
      <BookDetailSection
        bookInfoLoading={bookInfoLoading}
        readerStatsLoading={readerStatsLoading}
        isbn={bookInfo?.item[0].isbn || ''}
        cover={bookInfo?.item[0]?.cover || ''}
        title={bookInfo?.item[0]?.title || ''}
        subTitle={bookInfo?.item[0]?.subInfo?.subTitle || ''}
        author={bookInfo?.item[0]?.author || ''}
        categoryName={bookInfo?.item[0]?.categoryName || ''}
        pubDate={bookInfo?.item[0]?.pubDate || ''}
        imageUrl={bookInfo?.item[0]?.cover || ''}
        link={bookInfo?.item[0]?.link || ''}
        readerCount={
          readerStats?.totalCollectors || defaultReaderStats.totalCollectors
        }
      />

      <BookDetailContent
        isLoading={bookInfoLoading}
        isbn={bookInfo?.item[0].isbn || ''}
        title={bookInfo?.item[0]?.title || ''}
        description={bookInfo?.item[0]?.description || ''}
        author={bookInfo?.item[0]?.author || ''}
        imageUrl={bookInfo?.item[0]?.cover || ''}
      />
    </Container>
  );
};

export default BookDetailPage;
