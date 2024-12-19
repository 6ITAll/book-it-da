import CommonBookCard from '@/components/commons/CommonBookCard';
import { useFetchRatingInfoQuery } from '@/features/BookSearchPage/api/bookSearchApi';

interface SearchBookCardProps {
  itemId: number;
  title: string;
  author: string;
  cover: string;
  customerReviewRank: number;
  priceStandard: number;
  onClick: () => void;
}

const SearchBookCard = ({
  itemId,
  title,
  author,
  cover,
  customerReviewRank,
  priceStandard,
  onClick,
}: SearchBookCardProps): JSX.Element => {
  const { data } = useFetchRatingInfoQuery({ itemId });
  const ratingCount = data?.item?.[0]?.subInfo?.ratingInfo?.ratingCount || 0;

  return (
    <CommonBookCard
      image={cover}
      title={title}
      author={author}
      customerReviewRank={customerReviewRank}
      priceStandard={priceStandard}
      ratingCount={ratingCount}
      onClick={onClick}
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
