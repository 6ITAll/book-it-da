import PostCard from '@components/commons/DetailPagePostCard';

interface OtherPostingCardProps {
  post: {
    title: string;
    content: string;
    user: {
      name: string;
      avatarUrl: string;
    };
    book?: {
      author?: string;
    };
  };
}

const OtherPostingCard = ({ post }: OtherPostingCardProps) => (
  <PostCard
    title={post.title}
    content={post.content}
    author={post.book?.author || post.user.name}
    avatar={post.user.avatarUrl}
  />
);

export default OtherPostingCard;
