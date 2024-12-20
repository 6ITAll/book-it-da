import CommonBookCard from '@components/commons/CommonBookCard';

interface BestBookCardProps {
  image: string;
  title?: string;
  onClick?: () => void;
}

const BestBookCard = ({
  image,
  title,
  onClick,
}: BestBookCardProps): JSX.Element => {
  return (
    <CommonBookCard
      image={image}
      title={title}
      onClick={onClick}
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
