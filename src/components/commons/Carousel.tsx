/** @jsxImportSource @emotion/react */
import Slider, { Settings } from 'react-slick';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselProps {
  settings?: Settings;
  children: React.ReactNode;
}

const Carousel = ({ settings, children }: CarouselProps): JSX.Element => {
  const defaultSettings: Settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dotsClass: 'slick-dots custom-dots',
    ...settings, // 외부에서 추가 설정 전달
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: '1rem',
        boxSizing: 'border-box',
        '.slick-prev, .slick-next': {
          zIndex: 2,
          '&::before': {
            color: '#333',
            fontSize: { xs: '16px', md: '24px' }, // 반응형 크기 설정
            opacity: 0.8,
            transition: 'color 0.3s ease',
          },
          '&:hover::before': {
            color: '#000',
            opacity: 1,
          },
        },
        '.custom-dots li button:before': {
          fontSize: '12px',
          color: '#aaa',
        },
        '.custom-dots li.slick-active button:before': {
          color: '#333',
        },
      }}
    >
      <Slider {...defaultSettings}>{children}</Slider>
    </Box>
  );
};

export default Carousel;
