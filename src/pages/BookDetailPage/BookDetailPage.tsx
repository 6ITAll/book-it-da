import { Container } from '@mui/material';
import { useFetchBookDetailQuery } from '@features/BookSearchPage/api/bookDetailApi';
import { useParams } from 'react-router-dom';
import BookDetailSection from '@components/BookDetailPage/BookDetailSection';
import BookDetailContent from '@components/BookDetailPage/BookDetailContent';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';

const BookDetailPage = (): JSX.Element => {
  const { itemId } = useParams<{ itemId: string }>();
  const numericItemId = itemId ? parseInt(itemId, 10) : 0; // ID를 숫자로 변환
  const { data, isLoading } = useFetchBookDetailQuery({
    itemId: numericItemId,
  });

  return (
    <Container maxWidth="lg" disableGutters sx={bookDetailStyles.container}>
      <BookDetailSection
        isLoading={isLoading}
        itemId={numericItemId}
        cover={data?.item[0]?.cover || ''}
        title={data?.item[0]?.title || ''}
        subTitle={data?.item[0]?.subInfo?.subTitle || ''}
        author={data?.item[0]?.author || ''}
        categoryName={data?.item[0]?.categoryName || ''}
        pubDate={data?.item[0]?.pubDate || ''}
        imageUrl={data?.item[0]?.cover || ''}
        link={data?.item[0]?.link || ''}
        customerReviewRank={data?.item[0]?.customerReviewRank || 0}
        ratingCount={data?.item[0]?.subInfo?.ratingInfo?.ratingCount || 0}
      />

      <BookDetailContent
        isLoading={isLoading}
        itemId={numericItemId}
        title={data?.item[0]?.title || ''}
        description={data?.item[0]?.description || ''}
        author={data?.item[0]?.author || ''}
        imageUrl={data?.item[0]?.cover || ''}
      />
    </Container>
  );
};

export default BookDetailPage;
