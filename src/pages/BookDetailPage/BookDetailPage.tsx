import BookDetailNavBar from '@components/BookDetailPage/BookDetailNavBar';
import { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useFetchBookDetailQuery } from '@features/BookSearchPage/api/bookDetailApi';
import { setBookDetail } from '@features/BookSearchPage/Slice/bookDetailSlice';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LeftBookDetailBox from '@components/BookDetailPage/LeftBookDetailBox';
import RightBookDetailBox from '@components/BookDetailPage/RightBookDetailBox';
import BookIntroduceTab from '@components/BookDetailPage/BookIntroduceTab';
import BookReviewTab from '@components/BookDetailPage/BookReviewTab';

const BookDetailPage = (): JSX.Element => {
  const { itemId } = useParams<{ itemId: string }>();
  const [currentTab, setCurrentTab] = useState(0);
  const numericItemId = itemId ? parseInt(itemId, 10) : 0; // 넘버로 변경
  const { data, isLoading, error } = useFetchBookDetailQuery({
    itemId: numericItemId,
  });
  const dispatch = useDispatch();

  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  // 데이터 변환 및 Redux 상태 저장
  useEffect(() => {
    if (data && data.item.length > 0) {
      const item = data.item[0];
      dispatch(
        setBookDetail({
          itemId: item.itemId,
          title: item.title,
          description: item.description, // 책소개(설명)
          author: item.author,
          categoryName: item.categoryName,
          pubDate: item.pubDate,
          cover: item.cover,
          link: item.link,
          subTitle: item.subInfo?.subTitle,
        }),
      );
    }
  }, [data, dispatch]);

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography>에러 발생: {JSON.stringify(error)}</Typography>;

  return (
    <>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          mt: 3,
          border: '1px solid #e7e8e9', // 모든 테두리에 스타일 지정
          borderTop: 'none', // 위쪽 테두리를 제거 - 선을 navbar에 붙이기 위해서 설정
        }}
      >
        {/*  북이미지와 정보 박스 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            padding: '1rem 1rem',
            gap: 3,
            borderBottom: '4px solid #e7e8e9',
            boxSizing: 'border-box',
          }}
        >
          {/* 왼쪽 박스 (책 이미지) */}
          <LeftBookDetailBox
            cover={data?.item[0].cover}
            title={data?.item[0].title}
          />
          {/* 오른쪽 박스 (책 정보) */}
          <RightBookDetailBox
            title={data?.item[0].title || '제목 없음'}
            subTitle={data?.item[0].subInfo?.subTitle || '부제 없음'}
            author={data?.item[0].author || '저자 정보 없음'}
            categoryName={data?.item[0].categoryName || '카테고리 없음'}
            pubDate={data?.item[0].pubDate || '출간일 정보 없음'}
            link={data?.item[0].link || ''}
            customerReviewRank={data?.item[0].customerReviewRank || 0} // 추가
            ratingCount={data?.item[0].subInfo?.ratingInfo?.ratingCount || 0} // 추가
          />
        </Box>
        {/* 책 소개 및 리뷰 부분*/}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            boxSizing: 'border-box',
            padding: '1rem 0',
          }}
        >
          {/* 메인 콘텐츠 */}
          <Box sx={{ width: '100%' }}>
            <BookDetailNavBar onTabChange={handleTabChange} />
            {/* 성별, 연령별 인기 분포 섹션 */}
            {currentTab === 0 && (
              <BookIntroduceTab
                itemId={numericItemId}
                description={data?.item[0].description || ''}
              />
            )}
            {/* 리뷰 섹션 */}
            {currentTab === 1 && (
              <BookReviewTab
                itemId={numericItemId}
                title={data?.item[0].title || ''}
                author={data?.item[0].author || ''}
                imageUrl={data?.item[0].cover || ''}
              />
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default BookDetailPage;
