import { http, HttpResponse } from 'msw';
import { Book, Posting, User } from '@shared/types/type';

const sampleBooks: Book[] = [
  {
    title: '금각사',
    author: '미시마 유키오',
    imageUrl: '/src/assets/images/sample1.jpg',
    isbn: '890121590X',
  },
  {
    title: '여행의 이유',
    author: '김영하',
    imageUrl: '/src/assets/images/sample2.jpg',
    isbn: 'K312930064',
  },
  {
    title: '참을 수 없는 존재의 가벼움',
    author: '밀란 쿤데라',
    imageUrl: '/src/assets/images/sample3.jpg',
    isbn: '8937437562',
  },
];

const currentUser: User = {
  userId: 1,
  userName: 'CurrentUser',
  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
  isFollower: false,
  isFollowing: false,
};

let savedPostings: Omit<Posting, 'id' | 'likeCount' | 'isLiked'>[] = [
  {
    title: '금각사 독후감',
    content: '<p>금각사의 아름다움에 대한 생각...</p>',
    book: sampleBooks[0],
    createdAt: '2023-05-01T09:00:00.000Z',
    user: currentUser,
    postType: '포스팅',
  },
  {
    title: '여행의 의미',
    content: '<p>김영하의 여행에 대한 통찰...</p>',
    book: sampleBooks[1],
    createdAt: '2023-05-02T10:00:00.000Z',
    user: currentUser,
    postType: '포스팅',
  },
  {
    title: '존재의 가벼움과 무거움',
    content: '<p>쿤데라의 철학적 소설에 대한 감상...</p>',
    book: sampleBooks[2],
    createdAt: '2023-05-03T11:00:00.000Z',
    user: currentUser,
    postType: '포스팅',
  },
];

export const savedPostingHandlers = [
  // 저장된 포스팅 목록 가져오기
  http.get('/api/postings/saved', () => {
    return HttpResponse.json(savedPostings);
  }),

  // 포스팅 저장하기
  http.post('/api/postings/save', async ({ request }) => {
    const newPosting = (await request.json()) as Omit<
      Posting,
      'id' | 'createdAt' | 'user' | 'likeCount' | 'isLiked'
    >;
    const savedPosting = {
      ...newPosting,
      createdAt: new Date().toISOString(),
      user: currentUser,
    };
    savedPostings = [savedPosting, ...savedPostings];
    return HttpResponse.json(savedPosting, { status: 201 });
  }),

  // 특정 포스팅 불러오기
  http.get('/api/postings/saved/:index', ({ params }) => {
    const index = Number(params.index);
    const posting = savedPostings[index];
    if (posting) {
      return HttpResponse.json(posting);
    } else {
      return HttpResponse.json(
        { message: '포스팅을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }
  }),
];
