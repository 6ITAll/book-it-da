// import { http, HttpResponse } from 'msw';
// import { mockPosts } from './feed';
// import sample1 from '@assets/images/sample1.jpg';
// import sample2 from '@assets/images/sample2.jpg';
// import sample3 from '@assets/images/sample3.jpg';

// const CURRENT_USER = {
//   userId: 2,
//   userName: 'Current User',
// };

// const mockOtherPosts = {
//   bookPosts: [
//     {
//       id: 3,
//       title: '금각사의 상징성에 대하여',
//       content:
//         '금각사가 상징하는 완벽한 아름다움과 주인공의 내면 세계가 충돌하는 방식이 인상적입니다.',
//       createdAt: '2024-01-19T09:00:00.000Z',
//       user: {
//         userId: 3,
//         userName: '김문학',
//         avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
//         isFollowing: false,
//         isFollower: false,
//       },
//       likeCount: 24,
//     },
//     {
//       id: 4,
//       title: '미시마 유키오의 섬세한 묘사',
//       content:
//         '불교 사찰을 배경으로 인간의 집착과 광기를 그려내는 작가의 필력이 돋보입니다.',
//       createdAt: '2024-01-17T09:00:00.000Z',
//       user: {
//         userId: 4,
//         userName: '박독서',
//         avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
//         isFollowing: true,
//         isFollower: false,
//       },
//       likeCount: 18,
//     },
//     {
//       id: 5,
//       title: '금각사와 현대사회',
//       content: '현대 사회의 관점에서 금각사를 재해석해보았습니다.',
//       createdAt: '2024-01-16T09:00:00.000Z',
//       user: {
//         userId: 5,
//         userName: '이독자',
//         avatarUrl: 'https://mui.com/static/images/avatar/3.jpg',
//         isFollowing: true,
//         isFollower: false,
//       },
//       likeCount: 15,
//     },
//   ],
//   userPosts: [
//     {
//       id: 101,
//       title: '노르웨이의 숲 리뷰',
//       content: '무라카미 하루키의 대표작을 읽고...',
//       createdAt: '2024-01-20T09:00:00.000Z',
//       user: {
//         userId: 2, // 원글 작성자와 동일한 ID
//         userName: 'John Doe', // 원글 작성자와 동일한 이름
//         avatarUrl: 'https://mui.com/static/images/avatar/1.jpg', // 원글 작성자와 동일한 아바타
//       },
//       book: {
//         title: '노르웨이의 숲',
//         author: '무라카미 하루키',
//         imageUrl: sample1,
//         isFollowing: false,
//         isFollower: false,
//       },
//     },
//     {
//       id: 102,
//       title: '해변의 카프카 감상',
//       content: '카프카의 초현실적인 이야기...',
//       createdAt: '2024-01-18T09:00:00.000Z',
//       user: {
//         userId: 2,
//         userName: 'John Doe',
//         avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
//         isFollowing: true,
//         isFollower: false,
//       },
//       book: {
//         title: '해변의 카프카',
//         author: '무라카미 하루키',
//         imageUrl: sample2,
//       },
//     },
//     {
//       id: 103,
//       title: '상실의 시대를 읽고',
//       content: '젊은 시절의 방황과 성장...',
//       createdAt: '2024-01-16T09:00:00.000Z',
//       user: {
//         userId: 2,
//         userName: 'John Doe',
//         avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
//         isFollowing: false,
//         isFollower: false,
//       },
//       book: {
//         title: '상실의 시대',
//         author: '무라카미 하루키',
//         imageUrl: sample3,
//       },
//     },
//   ],
// };

// export const postingHandlers = [
//   // 현재 유저 정보를 가져오는 핸들러
//   http.get('/api/me', () => {
//     return HttpResponse.json(CURRENT_USER);
//   }),

//   // 포스팅 정보를 가져오는 핸들러
//   http.get('/api/posts/:postId', ({ params }) => {
//     const post = mockPosts.find((p) => p.id === Number(params.postId));

//     if (!post) {
//       return HttpResponse.json(
//         { message: '포스팅을 찾을 수 없습니다.' },
//         { status: 404 },
//       );
//     }

//     return HttpResponse.json({
//       ...post,
//       isCurrentUserAuthor: post.user.userId === CURRENT_USER.userId,
//     });
//   }),

//   http.get('/api/books/:bookId/posts', () => {
//     return HttpResponse.json(mockOtherPosts.bookPosts);
//   }),

//   http.get('/api/users/:userId/posts', () => {
//     return HttpResponse.json(mockOtherPosts.userPosts);
//   }),
// ];
