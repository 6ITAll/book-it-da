import { Container } from '@mui/material';
import { useFetchBookDetailQuery } from '@features/BookSearchPage/api/bookDetailApi';
import { useParams } from 'react-router-dom';
import BookDetailSection from '@components/BookDetailPage/BookDetailSection';
import BookDetailContent from '@components/BookDetailPage/BookDetailContent';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
const BookDetailPage = (): JSX.Element => {
  const { isbn } = useParams<{ isbn: string }>();
  const { data } = useFetchBookDetailQuery({
    isbn: isbn!,
  });

  return (
    <Container maxWidth="lg" disableGutters sx={bookDetailStyles.container}>
      <BookDetailSection
        isbn={data?.item[0].isbn || ''}
        title={data?.item[0].title || '제목 없음'}
        cover={data?.item[0].cover || '이미지 없음'}
        subTitle={data?.item[0].subInfo?.subTitle || '부제 없음'}
        author={data?.item[0].author || '저자 정보 없음'}
        categoryName={data?.item[0].categoryName || '카테고리 없음'}
        pubDate={data?.item[0].pubDate || '출간일 정보 없음'}
        imageUrl={data?.item[0].cover || '이미지 없음'}
        customerReviewRank={data?.item[0].customerReviewRank || 0}
        ratingCount={data?.item[0].subInfo?.ratingInfo?.ratingCount || 0}
        link={data?.item[0].link || ''}
      />
      {/* 책 소개 및 리뷰 부분*/}
      <BookDetailContent
        isbn={data?.item[0].isbn || ''}
        title={data?.item[0].title || ''}
        description={data?.item[0].description || ''}
        author={data?.item[0].author || ''}
        imageUrl={data?.item[0].cover || ''}
      />
    </Container>
  );
};

export default BookDetailPage;
