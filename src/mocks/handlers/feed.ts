import { http, HttpResponse } from 'msw';
import { Book, FeedType, PostType } from '@shared/types/type';

const IMAGES = {
  sample1: new URL('../../assets/images/sample1.jpg', import.meta.url).href,
  sample2: new URL('../../assets/images/sample2.jpg', import.meta.url).href,
  sample3: new URL('../../assets/images/sample3.jpg', import.meta.url).href,
  sample4: new URL('../../assets/images/sample4.jpg', import.meta.url).href,
  sample5: new URL('../../assets/images/sample5.jpg', import.meta.url).href,
  sample6: new URL('../../assets/images/sample6.jpg', import.meta.url).href,
  sample7: new URL('../../assets/images/sample7.jpg', import.meta.url).href,
  sample8: new URL('../../assets/images/sample8.jpg', import.meta.url).href,
  sample9: new URL('../../assets/images/sample9.jpg', import.meta.url).href,
  sample10: new URL('../../assets/images/sample10.jpg', import.meta.url).href,
};

const mockBooks: Book[] = [
  {
    bookTitle: '금각사',
    author: '미시마 유키오',
    imageUrl: IMAGES.sample1,
    itemId: 1,
  },
  {
    bookTitle: '여행의 이유',
    author: '김영하',
    imageUrl: IMAGES.sample2,
    itemId: 1,
  },
  {
    bookTitle: '목숨을 팝니다',
    author: '미시마 유키오',
    imageUrl: IMAGES.sample3,
    itemId: 1,
  },
  {
    bookTitle: '눈먼 자들의 도시',
    author: '주제 사라마구',
    imageUrl: IMAGES.sample4,
    itemId: 1,
  },
  {
    bookTitle: '밤의 사색',
    author: '헤르만 헤세',
    imageUrl: IMAGES.sample5,
    itemId: 1,
  },
  {
    bookTitle: '보통의 존재',
    author: '이석원',
    imageUrl: IMAGES.sample6,
    itemId: 1,
  },
  {
    bookTitle: '가나',
    author: '정용준',
    imageUrl: IMAGES.sample7,
    itemId: 1,
  },
  {
    bookTitle: '사랑의 잔상들',
    author: '장혜령',
    imageUrl: IMAGES.sample8,
    itemId: 1,
  },
  {
    bookTitle: '시와 산책',
    author: '한정원',
    imageUrl: IMAGES.sample9,
    itemId: 1,
  },
  {
    bookTitle: '나는 나를 파괴할 권리가 있다',
    author: '김영하',
    imageUrl: IMAGES.sample10,
    itemId: 1,
  },
];

// 랜덤 시간을 생성하는 함수 > 추후 삭제할 예정
const generateRandomTimeAgo = (): string => {
  const possibleTimeAgo = ['방금', '1분 전', '1시간 전', '하루 전'];
  return possibleTimeAgo[Math.floor(Math.random() * possibleTimeAgo.length)];
};

// 랜덤 제목을 생성하는 함수 > 추후 삭제할 예정
const generateRandomTitle = (): string => {
  const possibleTitle = [
    '재밌게 읽었습니다.',
    '또 읽고 싶어요',
    '인생 책입니다',
  ];
  return possibleTitle[Math.floor(Math.random() * possibleTitle.length)];
};

// 랜덤 제목을 생성하는 함수 > 추후 삭제할 예정
const generateRandomDescription = (): string => {
  const possibleDescription = [
    '끝까지 읽게 되는 책이네요. 내일도 읽을 거예요. 모레도 읽을 거예요. 글피에도 읽을 거예요. 내년에도 읽을 거예요. 죽어서도 읽을 거예요. 사실 오늘 갖다 팔 거예요.',
    '문장력이 엄청난 책이에요. 좋아요. 재밌어요. 훌륭해요. 도움이 돼요. 또 읽고 싶어요.',
    '소장 가치가 있는 책이에요. 무덤까지 가져가고 싶네요. 좋아요. 너무 좋아요. 매우 좋아요. 엄청 좋아요. 미치겠어요. 사실 별로 안 좋아요.',
  ];
  return possibleDescription[
    Math.floor(Math.random() * possibleDescription.length)
  ];
};

// 랜덤 포스트 타입을 생성하는 함수 > 추후 삭제할 예정
const generateRandomPostType = (): PostType => {
  const possiblePostType: PostType[] = ['한줄평', '포스팅'];
  return possiblePostType[Math.floor(Math.random() * possiblePostType.length)];
};

// 랜덤 피드 타입을 생성하는 함수 > 추후 삭제할 예정
const generateRandomFeedType = (): FeedType => {
  const possibleFeedType: FeedType[] = ['추천', '팔로워', '팔로잉'];
  return possibleFeedType[Math.floor(Math.random() * possibleFeedType.length)];
};

const generateMockPosts = (
  page: number,
  limit: number,
  postType?: string,
  feedType?: string,
) => {
  const startIndex = (page - 1) * limit;
  const posts = Array.from({ length: limit }, (_, i) => {
    const book = mockBooks[Math.floor(Math.random() * mockBooks.length)];
    return {
      id: startIndex + i + 1,
      title: generateRandomTitle(),
      description: generateRandomDescription(),
      imageUrl: book.imageUrl,
      userName: `user${startIndex + i + 1}`,
      timeAgo: generateRandomTimeAgo(),
      postType: postType || generateRandomPostType(),
      feedType: feedType || generateRandomFeedType(),
      bookTitle: book.bookTitle,
      bookAuthor: book.author,
      likeCount: Math.floor(Math.random() * 1000),
      isLiked: false,
    };
  });

  return posts.filter((post) => {
    const postTypeMatch = !postType || post.postType === postType;
    const feedTypeMatch = !feedType || post.feedType === feedType;
    return postTypeMatch && feedTypeMatch;
  });
};

export const feedHandlers = [
  http.get('/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const postType = url.searchParams.get('postType') || undefined;
    const feedType = url.searchParams.get('feedType') || undefined;

    const posts = generateMockPosts(page, limit, postType, feedType);
    const totalCount = 100;
    const hasMore = page * limit < totalCount;

    return HttpResponse.json({
      posts,
      hasMore,
      totalCount,
    });
  }),
];
