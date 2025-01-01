import CommonBookCard from '@components/commons/CommonBookCard';
import { useFetchRatingInfoQuery } from '@features/BookSearchPage/api/bookSearchApi';
import { navigateToDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

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
}: SearchBookCardProps): JSX.Element => {
  const navigate = useNavigate();
  const { data } = useFetchRatingInfoQuery({ itemId });
  const ratingCount = data?.item?.[0]?.subInfo?.ratingInfo?.ratingCount || 0;

  // 책 고유 id 값으로 상세페이지 이동
  const handleCardClick = () => {
    navigateToDetailPage(navigate, itemId);
  };

  return (
    <CommonBookCard
      image={cover}
      title={title}
      author={author}
      customerReviewRank={customerReviewRank}
      priceStandard={priceStandard}
      ratingCount={ratingCount}
      onClick={handleCardClick}
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
