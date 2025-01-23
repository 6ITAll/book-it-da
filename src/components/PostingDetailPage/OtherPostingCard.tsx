import PostCard from '@components/commons/PostCard';
import { OtherPost } from '@features/PostDetailPage/types/types';

interface OtherPostingCardProps {
  post: OtherPost;
}

const OtherPostingCard = ({ post }: OtherPostingCardProps) => {
  console.log('OtherPostingCard post:', post);

  return (
    <PostCard
      title={post.title}
      description={post.content}
      userName={post.user.username}
      avatar={post.user.avatarUrl}
      userId={post.user.id}
    />
  );
};

export default OtherPostingCard;
