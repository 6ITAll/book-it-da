import { http, HttpResponse } from 'msw';

interface User {
  id: number;
  userId: string;
  name: string;
  avartarUrl: string;
  about?: string;
  userStats?: Array<{ count: number; label: string; isAction?: boolean }>;
}

export const followsData: { follows: User[] } = {
  follows: [
    {
      id: 1,
      userId: 'kim',
      name: '김독서',
      avartarUrl: '',
      about: '책을 사랑하는 독서가',
      userStats: [
        { count: 286, label: '피드' },
        { count: 842, label: '팔로워', isAction: true },
        { count: 267, label: '팔로잉', isAction: true },
      ],
    },
    {
      id: 2,
      userId: 'lee',
      name: '이독서',
      avartarUrl: '',
      about: '책을 사랑하는 독서가',
      userStats: [
        { count: 286, label: '피드' },
        { count: 842, label: '팔로워', isAction: true },
        { count: 267, label: '팔로잉', isAction: true },
      ],
    },
    {
      id: 3,
      userId: 'jung',
      name: '정독서',
      avartarUrl: '',
      about: '책을 사랑하는 독서가',
      userStats: [
        { count: 286, label: '피드' },
        { count: 842, label: '팔로워', isAction: true },
        { count: 267, label: '팔로잉', isAction: true },
      ],
    },
  ],
};

export const follows = followsData.follows;

export const followHandlers = [
  http.get('/api/follows', () => {
    return HttpResponse.json(follows, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.delete('/api/follows/:userId', (req) => {
    const { userId } = req.params;

    followsData.follows = followsData.follows.filter(
      (follow) => follow.userId !== userId,
    );

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];
