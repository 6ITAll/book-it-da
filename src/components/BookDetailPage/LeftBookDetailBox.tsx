import { Box } from '@mui/material';

interface LeftBookDetailBoxProps {
  cover: string;
  title: string;
}

const LeftBookDetailBox = ({
  cover,
  title,
}: LeftBookDetailBoxProps): JSX.Element => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(145deg, #f0f0f0, #c8c8c8)', // 배경 효과
        borderRadius: '12px',
        height: { xs: '300px', md: '400px' }, // 반응형 높이
        padding: '1rem',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <img
        src={cover}
        alt={title || 'Book Cover'}
        style={{
          width: '80%',
          height: '80%',
          objectFit: 'contain',
          borderRadius: '8px',
        }}
      />
    </Box>
  );
};

export default LeftBookDetailBox;
