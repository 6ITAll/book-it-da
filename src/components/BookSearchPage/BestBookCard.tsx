import CommonBookCard from '@components/commons/CommonBookCard';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
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

  const handleCardClick = () => {
    navigateToBookDetailPage(navigate, isbn);
  };

  return (
    <CommonBookCard
      image={image}
      title={title || '제목 없음'}
      onClick={handleCardClick}
      sx={{
        borderRadius: 0,
        boxShadow: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        '& .MuiCardMedia-root': {
          height: { xs: 100, sm: 150, md: 200 }, // 반응형 높이 조절
          width: 'auto',
        },
        '& .MuiCardContent-root': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px',
        },
        '& .MuiTypography-body1': {
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '8px',
        },
      }}
    />
  );
};

export default BestBookCard;
