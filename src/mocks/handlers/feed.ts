import { http, HttpResponse } from 'msw';
import { FeedType, OneLinePost, Posting, PostType } from '@shared/types/type';
import { formatTimeAgo } from '@shared/utils/formatTimeAgo';

const mockPosts: (OneLinePost | Posting)[] = [
  {
    id: 1,
    imageUrl: '/src/assets/images/sample2.jpg',
    userName: 'user1',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: true,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 10,
    isLiked: false,
  },
  {
    id: 2,
    imageUrl: '/src/assets/images/sample1.jpg',
    userName: 'user2',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: true,
    isFollower: true,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 20,
    isLiked: false,
  },
  {
    id: 3,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user3',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: true,
    isFollower: true,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 4,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user354',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: true,
    isFollower: true,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 5,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user31',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: true,
    isFollower: true,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 6,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user352',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: true,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 7,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user323',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 8,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user3521',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 9,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user312',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 10,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user3545',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 11,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user3256',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 12,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user351s',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 13,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user233',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 14,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user115',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 15,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user3325',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: true,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 16,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user7325',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: true,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 17,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user23',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 18,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user5235',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: true,
    isFollower: false,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 19,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user1563',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 20,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user3125',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 21,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user1253',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 22,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user3125',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 23,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user1253',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description: '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 24,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user3515',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
  {
    id: 25,
    imageUrl: '/src/assets/images/sample3.jpg',
    userName: 'user153',
    createdAt: '2025-01-02T11:04:08.842579',
    postType: '포스팅' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '책 제목 1',
    bookAuthor: '저자 1',
    title: '포스팅 제목 1',
    description:
      '포스팅 내용 1입니다. 이 책은 정말 흥미롭습니다. 이 책은 정말 흥미롭습니다. 이 책은 정말 흥미롭습니다. 이 책은 정말 흥미롭습니다.',
    likeCount: 30,
    isLiked: false,
  },
  {
    id: 26,
    imageUrl: '/src/assets/images/sample5.jpg',
    userName: 'user35145',
    createdAt: '2025-01-01T19:40:36.434789',
    postType: '한줄평' as const,
    isFollowing: false,
    isFollower: false,
    bookTitle: '밤의 사색',
    bookAuthor: '헤르만 헤세',
    likeCount: 723,
    isLiked: true,
    review: '이 책은 정말 흥미롭습니다. 리뷰 35',
  },
].map((post) => ({
  ...post,
  timeAgo: formatTimeAgo(post.createdAt),
}));

export const feedHandlers = [
  http.get('/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const postType = url.searchParams.get('postType') as PostType | undefined;
    const feedType = url.searchParams.get('feedType') as FeedType;

    let filteredPosts = [...mockPosts];

    // 피드 타입에 따른 필터링
    switch (feedType) {
      case '팔로잉':
        filteredPosts = filteredPosts.filter((post) => post.isFollowing);
        break;
      case '팔로워':
        filteredPosts = filteredPosts.filter((post) => post.isFollower);
        break;
      case '추천':
      default:
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

    const response = {
      posts: paginatedPosts.map((post) => ({
        ...post,
        timeAgo: formatTimeAgo(post.createdAt),
      })),
      hasMore: startIndex + limit < filteredPosts.length,
      totalCount: filteredPosts.length,
    };

    return HttpResponse.json(response);
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
