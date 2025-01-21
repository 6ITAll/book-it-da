import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPostsParams, PostsResponse } from '../types/types';
import { supabase } from '@utils/supabaseClient';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, GetPostsParams>({
      queryFn: async ({ page, postType, limit = 10 }) => {
        try {
          const offset = (page - 1) * limit;

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

          if (postType === '한줄평') {
            query = query.not('one_line_review', 'is', null);
          } else if (postType === '포스팅') {
            query = query.not('posting', 'is', null);
          }

          const { data, error } = await query;

          if (error) {
            console.error('피드 조회 실패:', error);
            return { error };
          }

          const posts = data
            ?.map((post) => {
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
                  username: user?.username,
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

          console.log('Mapped Posts:', posts);

          return {
            data: {
              posts,
              hasMore: data.length === limit, // 더 많은 데이터가 있는지 확인
              totalCount: data.length, // 총 데이터 개수 (예시)
            },
          } as { data: PostsResponse };
        } catch (error) {
          console.error('피드 조회 중 오류:', error);
          return { error };
        }
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.postType}`;
      },
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
