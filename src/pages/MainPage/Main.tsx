import { useCallback, useMemo, useState } from 'react';
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
import { FeedTypeFilter } from '@components/FeedPage/Filters/FeedTypeFilter';
import { PostTypeFilter } from '@components/FeedPage/Filters/PostTypeFilter';
import { PostType, FeedType, OneLinePost, Posting } from '@shared/types/type';
import CreateIcon from '@mui/icons-material/Create';
import PostTypeSelectDialog from '@components/FeedPage/PostTypeSelectDialog/PostTypeSelectDialog';
import {
  useGetPostsQuery,
  useToggleFollowMutation,
} from '@features/FeedPage/api/feedApi';

const Main = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [postType, setPostType] = useState<PostType | null>(null);
  const [feedType, setFeedType] = useState<FeedType>('추천');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [localFollowChanges, setLocalFollowChanges] = useState<
    Array<{ userName: string; isFollowing: boolean }>
  >([]);
  const [toggleFollow] = useToggleFollowMutation();

  const { data, isLoading, isFetching } = useGetPostsQuery({
    page,
    postType: postType || undefined,
    feedType,
  });

  const filteredPosts = useMemo(() => {
    if (!data?.posts) return [];

    return data.posts.filter((post) => {
      switch (feedType) {
        case '팔로잉':
          return post.isFollowing;
        case '팔로워':
          return post.isFollower;
        case '추천':
        default:
          return true;
      }
    });
  }, [data?.posts, feedType]);

  // 포스트 타입 (한줄평 | 포스팅) 필터링 설정
  const handlePostTypeChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newValue: PostType | null) => {
      setPostType(newValue);
      setPage(1);
      window.scrollTo(0, 0);
    },
    [],
  );

  // 피드 타입 (추천 | 팔로워 | 팔로잉) 필터링
  const handleFeedTypeChange = useCallback(
    async (_: React.SyntheticEvent, newValue: FeedType) => {
      // 저장된 팔로우 변경사항이 있다면 탭 전환시 API 요청
      if (localFollowChanges.length > 0) {
        try {
          await Promise.all(
            localFollowChanges.map(({ userName, isFollowing }) =>
              toggleFollow({ userName, isFollowing }).unwrap(),
            ),
          );
          // 변경사항 초기화
          setLocalFollowChanges([]);
        } catch (error) {
          console.error('팔로우/언팔로우 실패:', error);
        }
      }

      setFeedType(newValue);
      setPage(1);
      window.scrollTo(0, 0);
    },
    [localFollowChanges, toggleFollow],
  );

  const handleFollowChange = useCallback(
    (userName: string, isFollowing: boolean) => {
      setLocalFollowChanges((prev) => [...prev, { userName, isFollowing }]);
    },
    [],
  );

  const fetchMoreData = useCallback(() => {
    if (!isFetching && data?.hasMore && data.posts.length > 0) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, data?.hasMore, data?.posts.length]);

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
        dataLength={filteredPosts.length ?? 0}
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
            columns={{ xs: 1, sm: 2, md: 4 }}
            spacing={4}
            sx={{
              width: '100%',
              boxSizing: 'border-box',
              overflowX: 'hidden',
            }}
          >
            {filteredPosts.map((post: OneLinePost | Posting) => {
              if ('title' in post && 'description' in post) {
                return (
                  <Box key={post.id}>
                    <PostCard
                      postId={post.id}
                      imageUrl={post.imageUrl}
                      userName={post.userName}
                      timeAgo={post.timeAgo}
                      postType="포스팅"
                      bookTitle={post.bookTitle}
                      bookAuthor={post.bookAuthor}
                      title={post.title}
                      description={post.description}
                      isFollowing={post.isFollowing}
                      onFollowChange={handleFollowChange}
                      likeCount={post.likeCount}
                      isLiked={post.isLiked}
                    />
                  </Box>
                );
              } else {
                return (
                  <Box key={post.id}>
                    <PostCard
                      postId={post.id}
                      imageUrl={post.imageUrl}
                      userName={post.userName}
                      timeAgo={post.timeAgo}
                      postType="한줄평"
                      bookTitle={post.bookTitle}
                      bookAuthor={post.bookAuthor}
                      review={post.review}
                      isFollowing={post.isFollowing}
                      onFollowChange={handleFollowChange}
                      likeCount={post.likeCount}
                      isLiked={post.isLiked}
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
