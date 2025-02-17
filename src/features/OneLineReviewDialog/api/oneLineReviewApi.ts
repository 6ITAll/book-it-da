import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { OneLineReviewRequest, OneLineReviewResponse } from '../types/types';
import { supabase } from '@utils/supabaseClient';
import { feedApi } from '@features/FeedPage/api/feedApi';
import { FeedType, PostType } from '@shared/types/type';
import { userFeedsApi } from '@features/MyPage/api/userFeedsApi';
import { bookOwnReviewApi } from '@features/BookDetailPage/api/bookOwnReviewApi';
import { bookFeedPreviewApi } from '@features/BookDetailPage/api/bookFeedPreviewApi';

export const oneLineReviewApi = createApi({
  reducerPath: 'oneLineReviewApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    createOneLineReview: builder.mutation<
      OneLineReviewResponse,
      OneLineReviewRequest
    >({
      queryFn: async ({ book, rating, review }) => {
        try {
          const { data: session } = await supabase.auth.getSession();
          if (!session) {
            return { error: { status: 401, data: 'Not authenticated' } };
          }

          const userId = session.session?.user.id;

          // 트랜잭션 시작
          const { data, error } = await supabase.rpc('create_one_line_review', {
            p_user_id: userId,
            p_isbn: book.isbn,
            p_review: review,
            p_rating: rating,
          });

          if (error) throw error;

          return { data: { success: true, post: data } };
        } catch (error) {
          console.error('한줄평 작성 실패:', error);
          return {
            error: { status: 500, data: 'Failed to create one-line review' },
          };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // 책 한줄평 미리보기 리페치
          await dispatch(
            bookFeedPreviewApi.util.invalidateTags(['BookFeedPreview']),
          );
          // 책 상세 페이지 본인 리뷰 리페치
          await dispatch(
            bookOwnReviewApi.util.invalidateTags(['BookOwnReview']),
          );
          // 유저 페이지 피드 리페치
          await dispatch(userFeedsApi.util.invalidateTags(['UserFeeds']));
          // 피드 데이터 리페치
          await dispatch(feedApi.util.invalidateTags(['Posts']));
          // 강제로 리페치 트리거 (모든 가능한 feedType과 postType 조합에 대해)
          const feedTypes: FeedType[] = ['추천', '팔로잉', '팔로워'];
          const postTypes: PostType[] = ['선택안함', '한줄평', '포스팅'];
          for (const feedType of feedTypes) {
            for (const postType of postTypes) {
              await dispatch(
                feedApi.endpoints.getPosts.initiate(
                  { page: 1, feedType, postType },
                  { forceRefetch: true },
                ),
              );
            }
          }
        } catch (error) {
          console.error('한줄평 작성 후 피드 업데이트 실패:', error);
        }
      },
    }),
  }),
});

export const { useCreateOneLineReviewMutation } = oneLineReviewApi;
