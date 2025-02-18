import { useDispatch, useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import { RootState } from '@store/index';
import { useGetRepliesQuery } from '@features/PostDetailPage/api/commentApi';
import { useEffect } from 'react';
import { updateVisibleReplies } from '@features/PostDetailPage/slice/commentSlice';
import { REPLIES_PER_PAGE } from '@constants/comment';

const CommentReplies = ({
  parentId,
  postId,
}: {
  parentId: string;
  postId: string;
}) => {
  const dispatch = useDispatch();
  const { replyPages, visibleReplies } = useSelector(
    (state: RootState) => state.postingComments,
  );
  const currentPage = replyPages[parentId] || 1;

  const { data: replies = [] } = useGetRepliesQuery({
    postId,
    parentId,
    page: currentPage,
    limit: REPLIES_PER_PAGE,
  });

  useEffect(() => {
    if (replies.length > 0) {
      dispatch(updateVisibleReplies({ parentId, replies }));
    }
  }, [replies, parentId, dispatch]);

  return (
    <>
      {visibleReplies[parentId]?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} postId={postId} />
      ))}
    </>
  );
};

export default CommentReplies;
