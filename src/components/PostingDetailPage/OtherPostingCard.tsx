import PostCard from '@components/commons/PostCard';
import { OtherPost } from '@features/PostDetailPage/types/types';

interface OtherPostingCardProps {
  post: OtherPost;
}

const OtherPostingCard = ({ post }: OtherPostingCardProps) => {
  console.log('OtherPostingCard post:', post.id);

  return (
    <PostCard
      postId={post.id}
      title={post.title}
      content={post.content}
      user={post.user}
    />
  );
};

export default OtherPostingCard;
