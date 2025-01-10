import PostCard from '@components/commons/PostCard';

interface OtherPostingCardProps {
  post: {
    title: string;
    content: string;
    user: {
      id: number;
      name: string;
      avatarUrl: string;
    };
  };
}

const OtherPostingCard = ({ post }: OtherPostingCardProps) => (
  <PostCard
    title={post.title}
    content={post.content}
    author={post.user.name}
    avatar={post.user.avatarUrl}
  />
);

export default OtherPostingCard;
