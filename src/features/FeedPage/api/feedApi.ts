import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FollowRequest, GetPostsParams, PostsResponse } from '../types/types';
import { OneLinePost, Posting } from '@shared/types/type';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  // 캐시 무효화 < 태그 정의
  tagTypes: ['Posts'] as const,
  endpoints: (builder) => ({
    // 포스트 목록
    getPosts: builder.query<PostsResponse, GetPostsParams>({
      query: ({ page, postType, feedType, limit = 10 }) => ({
        // 엔드포인트
        url: '/posts',
        params: {
          page,
          postType,
          feedType,
          limit,
        },
      }),
      // 캐시 키 생성 - feedType과 postType으로 구분하여 각각의 필터 조합마다 캐시 유지
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.feedType}-${queryArgs.postType}`;
      },
      // 무한스크롤 하기 위한 merge 로직
      merge: (currentCache, newItems, { arg }) => {
        // 첫 페이지 요청시 캐시 초기화
        if (arg.page === 1) {
          return newItems;
        }
        // 이후의 데이터는 기존의 것에 추가
        return {
          ...currentCache,
          posts: [...currentCache.posts, ...newItems.posts],
          hasMore: newItems.hasMore,
          totalCount: newItems.totalCount,
        };
      },
      // 캐시 대신 새로운 데이터를 가져올지
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return true;
        // 페이지, 피드타입, 포스트타입이 변경되면 새로운 데이터 페치
        return (
          currentArg?.page !== previousArg.page ||
          currentArg?.feedType !== previousArg.feedType ||
          currentArg?.postType !== previousArg.postType
        );
      },
    }),
    // 팔로우 / 언팔로우 토글
    toggleFollow: builder.mutation<{ success: boolean }, FollowRequest>({
      query: ({ userName, isFollowing }) => ({
        // 엔드포인트
        url: '/follow',
        method: 'POST',
        body: { userName, isFollowing },
      }),
      async onQueryStarted(
        { userName, isFollowing },
        { dispatch, queryFulfilled },
      ) {
        // 나은 사용자 경험 위해 서버 응답 전 UI 업데이트
        const patchResult = dispatch(
          feedApi.util.updateQueryData(
            'getPosts',
            {
              page: 1,
              feedType: '추천',
              postType: undefined,
            },
            (draft: PostsResponse) => {
              return {
                ...draft,
                // 해당 유저의 포스트만 버튼 상태 업데이트
                posts: draft.posts.map((post: OneLinePost | Posting) =>
                  post.userName === userName ? { ...post, isFollowing } : post,
                ),
              };
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // 요청 실패시 UI 롤백
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useToggleFollowMutation } = feedApi;
