import { Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@mui/material/Grid2';
interface InfiniteScrollComponentProps<T> {
  items: T[];
  hasMore: boolean;
  fetchMore: () => void;
  renderItem: (item: T, index: number) => JSX.Element;
  endMessage?: string;
  gridSize?: { xs: number; md: number };
}

const InfiniteScrollComponent = <T,>({
  items,
  hasMore,
  fetchMore,
  renderItem,
  endMessage = '모든 항목을 확인했습니다.',
  gridSize = { xs: 12, md: 4 }, // 기본값 설정
}: InfiniteScrollComponentProps<T>): JSX.Element => {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMore}
      hasMore={hasMore}
      scrollThreshold={0.99}
      loader={
        <Typography sx={{ textAlign: 'center', marginTop: '1rem' }}>
          Loading...
        </Typography>
      }
      endMessage={
        <Typography sx={{ textAlign: 'center', marginTop: '1rem' }}>
          {endMessage}
        </Typography>
      }
    >
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid size={gridSize} key={index}>
            {renderItem(item, index)}
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
