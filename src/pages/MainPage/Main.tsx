import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Stack,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from '@components/FeedPage/PostCard/PostCard';
import ScrollToTop from '@components/commons/ScrollToTop';
import FeedTypeFilter from '@components/FeedPage/Filters/FeedTypeFilter';
import PostTypeFilter from '@components/FeedPage/Filters/PostTypeFilter';
import { PostType, FeedType, OneLinePost, Posting } from '@shared/types/type';
import CreateIcon from '@mui/icons-material/Create';
import PostTypeSelectDialog from '@components/FeedPage/PostTypeSelectDialog/PostTypeSelectDialog';
import { useGetPostsQuery } from '@features/FeedPage/api/feedApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  setPosts,
  setPage,
  setPostType,
  setFeedType,
  setHasMore,
  setTotalCount,
} from '@features/FeedPage/slice/feedSlice';

const Main = (): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { page, postType, feedType, hasMore } = useSelector(
    (state: RootState) => state.feed,
  );

  const { data, isLoading, isFetching, refetch } = useGetPostsQuery(
    { page, postType: postType || undefined, feedType },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data.posts));
      dispatch(setHasMore(data.hasMore));
      dispatch(setTotalCount(data.totalCount));
    }
  }, [data, dispatch]);

  // 포스트 타입 (한줄평 | 포스팅) 필터링 설정
  const handlePostTypeChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newValue: PostType | null) => {
      dispatch(setPostType(newValue));
      dispatch(setPage(1));
      window.scrollTo(0, 0);
      refetch();
    },
    [dispatch, refetch],
  );

  // 피드 타입 (추천 | 팔로워 | 팔로잉) 필터링
  const handleFeedTypeChange = useCallback(
    (_: React.SyntheticEvent, newValue: FeedType) => {
      dispatch(setFeedType(newValue));
      dispatch(setPage(1));
      window.scrollTo(0, 0);
      refetch();
    },
    [dispatch, refetch],
  );

  const fetchMoreData = useCallback(() => {
    if (!isFetching && hasMore) {
      dispatch(setPage(page + 1));
    }
  }, [isFetching, hasMore, page, dispatch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%',
        padding: '1rem',
        margin: '0 auto',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '1rem',
        }}
      >
        <FeedTypeFilter
          feedType={feedType}
          onFeedTypeChange={handleFeedTypeChange}
        />
        <Button
          variant="outlined"
          onClick={() => setDialogOpen(true)}
          endIcon={<CreateIcon />}
        >
          글쓰기
        </Button>
        <PostTypeSelectDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      </Stack>
      <Divider
        sx={{
          mt: '0',
          marginBottom: '1rem',
        }}
      />
      <Box
        sx={{
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <PostTypeFilter
          postType={postType}
          onPostTypeChange={handlePostTypeChange}
        />
      </Box>
      <InfiniteScroll
        dataLength={data?.posts?.length ?? 0}
        next={fetchMoreData}
        hasMore={data?.hasMore ?? false}
        scrollThreshold={0.99}
        loader={
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem 1rem',
            }}
          >
            <CircularProgress />
          </Box>
        }
        endMessage={
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem 1rem',
            }}
          >
            <></>
          </Box>
        }
        style={{
          padding: '20px 0',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflowX: 'hidden',
        }}
      >
        {isLoading || !data ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
            spacing={4}
            sx={{
              width: '100%',
              boxSizing: 'border-box',
              overflowX: 'hidden',
            }}
          >
            {data?.posts?.map((post: OneLinePost | Posting) => {
              if ('title' in post && 'content' in post) {
                return (
                  <Box key={post.id}>
                    <PostCard
                      postId={post.id}
                      createdAt={post.createdAt}
                      user={post.user}
                      book={post.book}
                      postType="포스팅"
                      title={post.title}
                      content={post.content}
                    />
                  </Box>
                );
              } else {
                return (
                  <Box key={post.id}>
                    <PostCard
                      postId={post.id}
                      createdAt={post.createdAt}
                      user={post.user}
                      book={post.book}
                      postType="한줄평"
                      review={post.review}
                    />
                  </Box>
                );
              }
            })}
          </Masonry>
        )}
      </InfiniteScroll>
      <ScrollToTop />
    </Container>
  );
};

export default Main;
