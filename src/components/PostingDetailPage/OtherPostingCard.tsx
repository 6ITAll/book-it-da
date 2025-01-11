import PostCard from '@components/commons/DetailPagePostCard';
import { OtherPost } from '@features/PostDetailPage/types/types';

interface OtherPostingCardProps {
  post: OtherPost;
}

const OtherPostingCard = ({ post }: OtherPostingCardProps) => (
  <PostCard
    title={post.title}
    description={post.content}
    userName={post.user.userName}
    avatar={post.user.avatarUrl}
  />
);

export default OtherPostingCard;
