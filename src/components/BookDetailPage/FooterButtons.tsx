import { Stack, Button } from '@mui/material';

interface FooterButtonsProps {
  link?: string;
}

const FooterButtons = ({ link }: FooterButtonsProps): JSX.Element => {
  const handleGoToBuy = () => {
    console.log(link);
    if (link) {
      window.open(link, '_blank'); // 링크로 이동
    } else {
      console.warn('구매 링크가 제공되지 않았습니다.');
    }
  };

  return (
    <Stack direction="row" height="15%" borderTop="1px solid #e7e8e9">
      <Button
        onClick={handleGoToBuy}
        sx={{
          flex: 1,
          backgroundColor: '#333',
          color: '#fff',
          borderRadius: '0 0 0 8px',
          '&:hover': { backgroundColor: '#444' },
        }}
      >
        사러 가기
      </Button>
      <Button sx={{ flex: 1, borderRadius: '0 0 8px 0' }}>내서재에 담기</Button>
    </Stack>
  );
};

export default FooterButtons;
