import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPostsParams, PostsResponse } from '../types/types';
import { supabase } from '@utils/Supabase/supabaseClient';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, GetPostsParams>({
      queryFn: async ({ page, postType, feedType, limit = 10 }) => {
        try {
          const offset = (page - 1) * limit;

          const {
            data: { user },
          } = await supabase.auth.getUser();

          // Supabase 쿼리 작성
          let query = supabase
            .from('post')
            .select(
              `
                id,
                created_at,
                user:user_id (
                  id,
                  username,
                  avatar_url
                ),
                one_line_review (
                  review,
                  rating
                ),
                posting (
                  title,
                  content
                ),
                isbn
              `,
            )
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

          // postType에 따른 필터링
          if (postType === '한줄평') {
            query = query.not('one_line_review', 'is', null);
          } else if (postType === '포스팅') {
            query = query.not('posting', 'is', null);
          }

          // feedType에 따른 필터링
          if (feedType === '팔로잉' && user) {
            const { data: followingIds } = await supabase
              .from('user_follow')
              .select('following_id')
              .eq('follower_id', user.id);

            if (followingIds) {
              query = query.in(
                'user_id',
                followingIds.map((f) => f.following_id),
              );
            }
          } else if (feedType === '팔로워' && user) {
            const { data: followerIds } = await supabase
              .from('user_follow')
              .select('follower_id')
              .eq('following_id', user.id);

            if (followerIds) {
              query = query.in(
                'user_id',
                followerIds.map((f) => f.follower_id),
              );
            }
          }

          const { data, error } = await query;

          if (error) {
            console.error('피드 조회 실패:', error);
            return { error };
          }

          const posts = data
            ?.map((post) => {
              // 객체가 배열로 인식되는 문제
              // 오류는 없지만 아래의 코드들 가독성이 떨어지는 것 같음
              const user = Array.isArray(post.user) ? post.user[0] : post.user;
              const oneLineReview = Array.isArray(post.one_line_review)
                ? post.one_line_review[0]
                : post.one_line_review;
              const posting = Array.isArray(post.posting)
                ? post.posting[0]
                : post.posting;

              const mappedPost = {
                id: post.id,
                createdAt: post.created_at,
                user: {
                  id: user?.id,
                  username: user?.username || user?.id,
                  avatarUrl: user?.avatar_url,
                },
                book: { isbn: post.isbn },
              };

              if (oneLineReview) {
                return {
                  ...mappedPost,
                  postType: '한줄평' as const,
                  review: oneLineReview.review,
                  rating: oneLineReview.rating,
                };
              }

              if (posting) {
                return {
                  ...mappedPost,
                  postType: '포스팅' as const,
                  title: posting.title,
                  content: posting.content,
                };
              }

              return null;
            })
            .filter((post): post is NonNullable<typeof post> => post !== null);

          return {
            data: {
              posts,
              hasMore: data.length === limit,
              totalCount: data.length,
            },
          } as { data: PostsResponse };
        } catch (error) {
          console.error('피드 조회 중 오류:', error);
          return { error };
        }
      },
      // 캐시 키 생성
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.feedType}-${queryArgs.postType}`;
      },
      // 무한 스크롤 위해 기존 데이터와 병합
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }
        const uniquePosts = [
          ...currentCache.posts,
          ...newItems.posts.filter(
            (newPost) =>
              !currentCache.posts.some((post) => post.id === newPost.id),
          ),
        ];
        return {
          ...currentCache,
          posts: uniquePosts,
          hasMore: newItems.hasMore,
          totalCount: newItems.totalCount,
        };
      },
    }),
  }),
});

export const { useGetPostsQuery } = feedApi;
