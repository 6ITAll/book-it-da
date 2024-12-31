import CommonBookCard from '@components/commons/CommonBookCard';
import { navigateToDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
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
    navigateToDetailPage(navigate, itemId);
  };

  return (
    <CommonBookCard
      image={image}
      title={title}
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
          height: 200,
          width: 'auto',
          margin: '0 auto',
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
