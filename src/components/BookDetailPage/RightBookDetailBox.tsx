import { Box, Stack, Typography } from '@mui/material';
import BookInfoBox from './BookInfoBox';
import ActionButtons from './ActionButtons';
import FooterButtons from './FooterButtons';
import { useFetchLibraryCountQuery } from '@features/BookDetailPage/api/bookUserShelfCountApi';
interface RightBookBoxProps {
  itemId: number;
  title: string;
  subTitle: string;
  author: string;
  categoryName: string;
  pubDate: string;
  link: string;
  imageUrl: string;
  customerReviewRank: number;
  ratingCount: number;
}

const RightBookBoxDetailBox = ({
  itemId,
  title,
  subTitle,
  author,
  categoryName,
  pubDate,
  link,
  imageUrl,
  customerReviewRank,
  ratingCount,
}: RightBookBoxProps): JSX.Element => {
  const { data } = useFetchLibraryCountQuery(itemId);
  console.log(data);
  return (
    <Box
      sx={{
        flex: 2,
        display: 'flex',
        alignContent: 'space-between',
        border: '1px solid #e7e8e9',
        width: '100%',
        flexDirection: 'column',
        alignSelf: 'stretch',
        borderRadius: '8px',
        justifyContent: 'space-between',
      }}
    >
      {/* 책 정보와 액션 버튼 */}
      <Box
        sx={{
          display: 'flex',
          padding: '2rem',
          height: '85%',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Stack
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <BookInfoBox
            title={title}
            subTitle={subTitle}
            author={author}
            categoryName={categoryName}
            pubDate={pubDate}
            customerReviewRank={customerReviewRank}
            ratingCount={ratingCount}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              borderTop: '1px solid #e7e8e9',
              padding: '1rem 0 1rem 0',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                color: 'text.secondary',
              }}
            >
              이 책이 담긴 서재 <strong>{data?.libraryCount || 0}명</strong>
            </Typography>
            <ActionButtons />
          </Box>
        </Stack>
      </Box>
      {/* 하단 버튼 */}
      <FooterButtons
        itemId={itemId}
        title={title}
        author={author}
        imageUrl={imageUrl}
        link={link}
      />
    </Box>
  );
};

export default RightBookBoxDetailBox;
