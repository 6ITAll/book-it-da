import PostCard from '@components/commons/PostCard';
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';
import { OtherPost } from '@features/PostDetailPage/types/types';

interface OtherPostingCardProps {
  post: OtherPost;
}

const OtherPostingCard = ({ post }: OtherPostingCardProps) => {
  const { data: bookData } = useSearchBookByIsbnQuery(
    { isbn: post?.isbn ?? '' },
    { skip: !post?.isbn },
  );

  return (
    <PostCard
      postId={post.id}
      title={post.title}
      content={post.content}
      cover={bookData?.cover}
      user={post.user}
    />
  );
};

export default OtherPostingCard;
