import { clearTempNewReply } from '@features/PostDetailPage/slice/commentSlice';
import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import CommentItem from './CommentItem';

interface TempNewReplyProps {
  parentId: string;
  postId: string;
  currentPage: number;
}

const TempNewReply = ({ parentId, postId }: TempNewReplyProps) => {
  const dispatch = useDispatch();
  const { tempNewReplies, visibleReplies } = useSelector(
    (state: RootState) => state.postingComments,
  );

  if (!tempNewReplies[parentId]) return null;

  // 현재 보이는 답글들 중에 임시 답글이 있는지 확인
  const isReplyVisible = visibleReplies[parentId]?.some(
    (reply) => reply.id === tempNewReplies[parentId].id,
  );

  if (isReplyVisible) {
    dispatch(clearTempNewReply(parentId));
    return null;
  }

  return (
    <CommentItem
      key={`temp-${tempNewReplies[parentId].id}`}
      comment={tempNewReplies[parentId]}
      postId={postId}
    />
  );
};

export default TempNewReply;
