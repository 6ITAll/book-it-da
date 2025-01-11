import { http, HttpResponse } from 'msw';
import {
  Book,
  FeedType,
  OneLinePost,
  Post,
  Posting,
  PostType,
} from '@shared/types/type';
import { OneLineReviewRequest } from '@features/OneLineReviewDialog/types/types';
import {
  PostingRequest,
  UpdatePostingRequest,
} from '@features/PostingWritePage/types/types';

export const bookData: Book[] = [
  {
    bookTitle: '금각사',
    author: '미시마 유키오',
    imageUrl: '/src/assets/images/sample1.jpg',
    itemId: 107413605,
  },
  {
    bookTitle: '여행의 이유',
    author: '김영하',
    imageUrl: '/src/assets/images/sample2.jpg',
    itemId: 337633173,
  },
  {
    bookTitle: '참을 수 없는 존재의 가벼움',
    author: '밀란 쿤데라',
    imageUrl: '/src/assets/images/sample3.jpg',
    itemId: 347978053,
  },
  {
    bookTitle: '눈먼 자들의 도시',
    author: '주제 사라마구',
    imageUrl: '/src/assets/images/sample4.jpg',
    itemId: 303079837,
  },
  {
    bookTitle: '밤의 사색',
    author: '헤르만 헤세',
    imageUrl: '/src/assets/images/sample5.jpg',
    itemId: 192003166,
  },
  {
    bookTitle: '보통의 존재',
    author: '이석원',
    imageUrl: '/src/assets/images/sample6.jpg',
    itemId: 4785218,
  },
  {
    bookTitle: '모국어는 차라리 침묵',
    author: '목정원',
    imageUrl: '/src/assets/images/sample7.jpg',
    itemId: 280910486,
  },
  {
    bookTitle: '구토',
    author: '장 폴 사르트르',
    imageUrl: '/src/assets/images/sample8.jpg',
    itemId: 33606,
  },
  {
    bookTitle: '시와 산책',
    author: '한정원',
    imageUrl: '/src/assets/images/sample9.jpg',
    itemId: 243698085,
  },
  {
    bookTitle: '봄눈',
    author: '미시마 유키오',
    imageUrl: '/src/assets/images/sample10.jpg',
    itemId: 251278195,
  },
];

const generateMockPosts = (): (OneLinePost | Posting)[] => {
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

    const userId = Math.floor(Math.random() * 10000);

    const basePost: Post = {
      id: i,
      createdAt: randomDate,
      user: {
        userId: userId,
        userName: `user${userId}`,
        avatarUrl: `https://mui.com/static/images/avatar/${Math.floor(Math.random() * 3) + 1}.jpg`,
        isFollowing: Math.random() < 0.5,
        isFollower: Math.random() < 0.5,
      },
      book: {
        bookTitle: book.bookTitle,
        author: book.author,
        imageUrl: book.imageUrl,
        itemId: book.itemId,
      },
      likeCount: Math.floor(Math.random() * 1000),
      isLiked: false,
    };

    if (Math.random() < 0.5) {
      posts.push({
        ...basePost,
        postType: '포스팅',
        title: `포스팅 제목 ${i}`,
        content: `
          <h2>책 리뷰</h2>
          <p>포스팅 내용 ${i}입니다. 이 책은 정말 흥미롭습니다.</p>
          <blockquote>인상 깊은 구절이 많았습니다.</blockquote>
          <p><strong>특히 이 부분이 좋았습니다.</strong></p>
        `,
      } as Posting);
    } else {
      posts.push({
        ...basePost,
        postType: '한줄평',
        review: `이 책은 정말 흥미롭습니다. 리뷰 ${i}`,
        rating: Math.floor(Math.random() * 5) + 1,
      } as OneLinePost);
    }
  }

  return posts;
};

export const mockPosts: (OneLinePost | Posting)[] = generateMockPosts();

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
        filteredPosts = filteredPosts.filter((post) => post.user.isFollowing);
        break;
      case '팔로워':
        filteredPosts = filteredPosts.filter((post) => post.user.isFollower);
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
      userId: number;
      isFollowing: boolean;
    };
    const { userId, isFollowing } = body;

    // mockPosts 배열의 실제 데이터 업데이트
    mockPosts.forEach((post, index) => {
      if (post.user.userId === userId) {
        mockPosts[index] = {
          ...post,
          user: {
            ...post.user,
            isFollowing,
          },
        };
      }
    });

    return HttpResponse.json({ success: true }, { status: 200 });
  }),
  http.post('/api/like', async ({ request }) => {
    const body = (await request.json()) as {
      postId: number;
      isLiked: boolean;
    };
    const { postId, isLiked } = body;

    // mockPosts 배열의 실제 데이터 업데이트
    mockPosts.forEach((post, index) => {
      if (post.id === postId) {
        mockPosts[index] = {
          ...post,
          isLiked,
          likeCount: isLiked ? post.likeCount + 1 : post.likeCount - 1,
        };
      }
    });

    return HttpResponse.json({ success: true }, { status: 200 });
  }),
  http.post('/api/posts/one-line-review', async ({ request }) => {
    const body = (await request.json()) as OneLineReviewRequest;
    const { book, rating, review } = body;

    const newPost: OneLinePost = {
      id: mockPosts.length + 1,
      createdAt: new Date().toISOString(),
      user: {
        userId: 1,
        userName: 'currentUser',
        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
        isFollower: false,
        isFollowing: false,
      },
      book: {
        bookTitle: book.bookTitle,
        author: book.author,
        imageUrl: book.imageUrl,
        itemId: book.itemId,
      },
      postType: '한줄평',
      likeCount: 0,
      isLiked: false,
      review,
      rating,
    };

    mockPosts.unshift(newPost);
    return HttpResponse.json({ success: true, post: newPost }, { status: 201 });
  }),
  http.post('/api/posts/posting', async ({ request }) => {
    const body = (await request.json()) as PostingRequest;
    const { book, title, content, userId } = body;

    const newPost: Posting = {
      id: mockPosts.length + 1,
      createdAt: new Date().toISOString(),
      user: {
        userId: userId,
        userName: 'currentUser',
        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
        isFollower: false,
        isFollowing: false,
      },
      book: {
        bookTitle: book.bookTitle,
        author: book.author,
        imageUrl: book.imageUrl,
        itemId: book.itemId,
      },
      postType: '포스팅',
      likeCount: 0,
      isLiked: false,
      title,
      content,
    };

    mockPosts.unshift(newPost);
    return HttpResponse.json(
      { success: true, message: '포스팅이 작성되었습니다.', post: newPost },
      { status: 201 },
    );
  }),
  http.put('/api/posts/posting/:postingId', async ({ params, request }) => {
    const { postingId } = params;
    const body = (await request.json()) as UpdatePostingRequest;
    const { book, title, content, userId } = body;

    const postIndex = mockPosts.findIndex(
      (post) => post.id === Number(postingId),
    );

    if (postIndex === -1) {
      return HttpResponse.json(
        { success: false, message: '포스팅을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    // userId 확인 (옵션)
    if (mockPosts[postIndex].user.userId !== userId) {
      return HttpResponse.json(
        { success: false, message: '포스팅을 수정할 권한이 없습니다.' },
        { status: 403 },
      );
    }

    const updatedPost = {
      ...mockPosts[postIndex],
      book: {
        bookTitle: book.bookTitle,
        author: book.author,
        imageUrl: book.imageUrl,
        itemId: book.itemId,
      },
      title,
      content,
    } as Posting;

    mockPosts[postIndex] = updatedPost;

    return HttpResponse.json(
      { success: true, message: '포스팅이 수정되었습니다.', post: updatedPost },
      { status: 200 },
    );
  }),
];
