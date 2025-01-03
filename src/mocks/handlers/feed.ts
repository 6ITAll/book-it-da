import { http, HttpResponse } from 'msw';
import {
  Book,
  FeedType,
  OneLinePost,
  Post,
  Posting,
  PostType,
} from '@shared/types/type';
import { formatTimeAgo } from '@shared/utils/formatTimeAgo';

const bookData: Book[] = [
  {
    bookTitle: '금각사',
    author: '미시마 유키오',
    imageUrl: '/src/assets/images/sample1.jpg',
    itemId: 1,
  },
  {
    bookTitle: '여행의 이유',
    author: '김영하',
    imageUrl: '/src/assets/images/sample2.jpg',
    itemId: 2,
  },
  {
    bookTitle: '목숨을 팝니다',
    author: '미시마 유키오',
    imageUrl: '/src/assets/images/sample3.jpg',
    itemId: 3,
  },
  {
    bookTitle: '눈먼 자들의 도시',
    author: '주제 사라마구',
    imageUrl: '/src/assets/images/sample4.jpg',
    itemId: 4,
  },
  {
    bookTitle: '밤의 사색',
    author: '헤르만 헤세',
    imageUrl: '/src/assets/images/sample5.jpg',
    itemId: 5,
  },
  {
    bookTitle: '보통의 존재',
    author: '이석원',
    imageUrl: '/src/assets/images/sample6.jpg',
    itemId: 6,
  },
  {
    bookTitle: '가나',
    author: '정용준',
    imageUrl: '/src/assets/images/sample7.jpg',
    itemId: 7,
  },
  {
    bookTitle: '사랑의 잔상들',
    author: '장혜령',
    imageUrl: '/src/assets/images/sample8.jpg',
    itemId: 8,
  },
  {
    bookTitle: '시와 산책',
    author: '한정원',
    imageUrl: '/src/assets/images/sample9.jpg',
    itemId: 9,
  },
  {
    bookTitle: '나는 나를 파괴할 권리가 있다',
    author: '김영하',
    imageUrl: '/src/assets/images/sample10.jpg',
    itemId: 10,
  },
];

const generateMockPosts = (): (OneLinePost | Posting)[] => {
  const usedUsernames = new Set<string>();
  const posts: (OneLinePost | Posting)[] = [];

  for (let i = 1; i <= 100; i++) {
    const book = bookData[Math.floor(Math.random() * bookData.length)];
    const randomDate = new Date(
      2024 + Math.floor(Math.random() * 2),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28),
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
    ).toISOString();

    let userName: string;
    do {
      userName = `user${Math.floor(Math.random() * 10000)}`;
    } while (usedUsernames.has(userName));
    usedUsernames.add(userName);

    const basePost: Post = {
      id: i,
      imageUrl: book.imageUrl,
      userName,
      createdAt: randomDate,
      timeAgo: formatTimeAgo(randomDate),
      postType: Math.random() < 0.5 ? '포스팅' : '한줄평',
      isFollowing: Math.random() < 0.5,
      isFollower: Math.random() < 0.5,
      bookTitle: book.bookTitle,
      bookAuthor: book.author,
    };

    if (basePost.postType === '포스팅') {
      posts.push({
        ...basePost,
        postType: '포스팅',
        title: `포스팅 제목 ${i}`,
        description: `포스팅 내용 ${i}입니다. 이 책은 정말 흥미롭습니다.`,
      } as Posting);
    } else {
      posts.push({
        ...basePost,
        postType: '한줄평',
        review: `이 책은 정말 흥미롭습니다. 리뷰 ${i}`,
      } as OneLinePost);
    }
  }

  return posts;
};

const mockPosts: (OneLinePost | Posting)[] = generateMockPosts();

// const mockPosts: (OneLinePost | Posting)[] = [
//  // 데이터
// ].map((post) => ({
//   ...post,
//   timeAgo: formatTimeAgo(post.createdAt),
// }));

export const feedHandlers = [
  http.get('/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const feedType = url.searchParams.get('feedType') as FeedType;
    const postType = url.searchParams.get('postType') as PostType | undefined;

    let filteredPosts = [...mockPosts];

    // 피드 타입에 따른 필터링
    switch (feedType) {
      case '팔로잉':
        filteredPosts = filteredPosts.filter((post) => post.isFollowing);
        break;
      case '팔로워':
        filteredPosts = filteredPosts.filter((post) => post.isFollower);
        break;
    }

    // 포스트 타입 필터링
    if (postType) {
      filteredPosts = filteredPosts.filter(
        (post) => post.postType === postType,
      );
    }

    const startIndex = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

    return HttpResponse.json({
      posts: paginatedPosts,
      hasMore: startIndex + limit < filteredPosts.length,
      totalCount: filteredPosts.length,
    });
  }),
  http.post('/api/follow', async ({ request }) => {
    const body = (await request.json()) as {
      userName: string;
      isFollowing: boolean;
    };
    const { userName, isFollowing } = body;

    // mockPosts 배열의 실제 데이터 업데이트
    mockPosts.forEach((post, index) => {
      if (post.userName === userName) {
        mockPosts[index] = {
          ...post,
          isFollowing,
        };
      }
    });

    console.log(`User ${userName} follow status changed to ${isFollowing}`);
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];
