import PostCard from '@components/commons/PostCard';
import { OtherPost } from './types';

interface OtherPostingCardProps {
  post: OtherPost;
}

const OtherPostingCard = ({ post }: OtherPostingCardProps) => {
  return (
    <PostCard
      postId={post.id}
      title={post.title}
      content={post.content}
      isbn={post?.isbn}
      user={post.user}
    />
  );
};

export default OtherPostingCard;
