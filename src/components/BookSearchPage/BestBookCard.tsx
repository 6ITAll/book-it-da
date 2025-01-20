import CommonBookCard from '@components/commons/CommonBookCard';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import { bestBookStyles } from './BookSearch.style';
interface BestBookCardProps {
  itemId: number;
  image: string;
  title?: string;
}

const BestBookCard = ({
  itemId,
  image,
  title,
}: BestBookCardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigateToBookDetailPage(navigate, itemId);
  };

  return (
    <CommonBookCard
      image={image}
      title={title || '제목 없음'}
      onClick={handleCardClick}
      sx={bestBookStyles.commonCard}
    />
  );
};

export default BestBookCard;
