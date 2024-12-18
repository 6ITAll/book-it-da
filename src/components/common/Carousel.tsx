/** @jsxImportSource @emotion/react */
import Slider, { Settings } from 'react-slick';
import { Box } from '@mui/material';
import { css } from '@emotion/react';
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
      css={css`
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
        .slick-prev,
        .slick-next {
          z-index: 2;
          &::before {
            color: #333;
            font-size: 30px;
            opacity: 0.8;
            transition: color 0.3s ease;
          }
          &:hover::before {
            color: #000;
            opacity: 1;
          }
        }
        .custom-dots li button:before {
          font-size: 12px;
          color: #aaa;
        }
        .custom-dots li.slick-active button:before {
          color: #333;
        }
      `}
    >
      <Slider {...defaultSettings}>{children}</Slider>
    </Box>
  );
};

export default Carousel;
