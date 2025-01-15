import { http, HttpResponse } from 'msw';

interface User {
  id: number;
  userId: string;
  name: string;
  avatarUrl: string;
  about?: string;
  userStats?: Array<{ count: number; label: string; isAction?: boolean }>;
}

export const followsData: {
  followers: User[];
  followings: User[];
} = {
  followers: [
    {
      id: 1,
      userId: 'kim',
      name: '김독서',
      avatarUrl: '',
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
      avatarUrl: '',
      about: '책을 사랑하는 독서가',
      userStats: [
        { count: 286, label: '피드' },
        { count: 842, label: '팔로워', isAction: true },
        { count: 267, label: '팔로잉', isAction: true },
      ],
    },
  ],
  followings: [
    {
      id: 3,
      userId: 'jung',
      name: '정독서',
      avatarUrl: '',
      about: '책을 사랑하는 독서가',
      userStats: [
        { count: 286, label: '피드' },
        { count: 842, label: '팔로워', isAction: true },
        { count: 267, label: '팔로잉', isAction: true },
      ],
    },
  ],
};

export const followHandlers = [
  http.get('/api/followers', () => {
    return HttpResponse.json(followsData.followers, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.get('/api/followings', () => {
    return HttpResponse.json(followsData.followings, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  http.delete('/api/follows/:userId', (req) => {
    const { userId } = req.params;

    followsData.followers = followsData.followers.filter(
      (follower) => follower.userId !== userId,
    );
    followsData.followings = followsData.followings.filter(
      (following) => following.userId !== userId,
    );

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];
