import { Container } from '@mui/material';
import { useFetchBookDetailQuery } from '@features/BookSearchPage/api/bookDetailApi';
import { useParams } from 'react-router-dom';
import BookDetailSection from '@components/BookDetailPage/BookDetailSection';
import BookDetailContent from '@components/BookDetailPage/BookDetailContent';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';

const BookDetailPage = (): JSX.Element => {
  const { isbn } = useParams<{ isbn: string }>();
  const { data, isLoading } = useFetchBookDetailQuery({
    isbn: isbn!,
  });
  console.log(data?.item);
  console.log(data?.item[0].subInfo.subTitle);

  return (
    <Container maxWidth="lg" disableGutters sx={bookDetailStyles.container}>
      <BookDetailSection
        isLoading={isLoading}
        isbn={data?.item[0].isbn || ''}
        cover={data?.item[0]?.cover || ''}
        title={data?.item[0]?.title || ''}
        subTitle={data?.item[0]?.subInfo?.subTitle || ''}
        author={data?.item[0]?.author || ''}
        categoryName={data?.item[0]?.categoryName || ''}
        pubDate={data?.item[0]?.pubDate || ''}
        imageUrl={data?.item[0]?.cover || ''}
        link={data?.item[0]?.link || ''}
      />

      <BookDetailContent
        isLoading={isLoading}
        isbn={data?.item[0].isbn || ''}
        title={data?.item[0]?.title || ''}
        description={data?.item[0]?.description || ''}
        author={data?.item[0]?.author || ''}
        imageUrl={data?.item[0]?.cover || ''}
      />
    </Container>
  );
};

export default BookDetailPage;
