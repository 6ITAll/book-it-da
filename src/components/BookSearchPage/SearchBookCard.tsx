import CommonBookCard from '@components/commons/CommonBookCard';
import { useFetchRatingInfoQuery } from '@features/BookSearchPage/api/bookSearchApi';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

interface SearchBookCardProps {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  customerReviewRank: number;
  priceStandard: number;
}

const SearchBookCard = ({
  isbn,
  title,
  author,
  cover,
  customerReviewRank,
  priceStandard,
}: SearchBookCardProps): JSX.Element => {
  const navigate = useNavigate();
  const { data } = useFetchRatingInfoQuery({ isbn });
  const ratingCount = data?.item?.[0]?.subInfo?.ratingInfo?.ratingCount || 0;

  return (
    <CommonBookCard
      image={cover}
      title={title}
      author={author}
      customerReviewRank={customerReviewRank}
      priceStandard={priceStandard}
      ratingCount={ratingCount}
      onClick={() => navigateToBookDetailPage(navigate, isbn)}
      sx={{
        boxShadow: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
    />
  );
};

export default SearchBookCard;
