import CommonBookCard from '@components/commons/CommonBookCard';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import { bestBookStyles } from '@components/BookSearchPage/BookSearch.style';
interface BestBookCardProps {
  isbn: string;
  image: string;
  title?: string;
}

const BestBookCard = ({
  isbn,
  image,
  title,
}: BestBookCardProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <CommonBookCard
      image={image}
      title={title || '제목 없음'}
      onClick={() => {
        navigateToBookDetailPage(navigate, isbn);
      }}
      sx={bestBookStyles.commonCard}
    />
  );
};

export default BestBookCard;
