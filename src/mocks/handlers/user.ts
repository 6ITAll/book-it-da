import { http, HttpResponse } from 'msw';

const mockUser = {
  userId: 'user',
  name: '김구름',
  phone: '010-1234-5678',
  avatarUrl: 'https://github.com/publdaze.png',
};

export const userHandlers = [
  http.get(`/api/user/:userId/feeds`, () => {
    return HttpResponse.json({
      posts: [
        {
          title: '2월은 결심하기 좋은 자기계발의 달!',
          content:
            '2024년에도 어김없이 결심의 시즌이 돌아왔습니다! 여러분을 위한 특별한 추천 도서를 소개합니다.',
          author: mockUser.name,
          avatar: '/path/to/avatar1.jpg',
        },
        {
          title: '✨ 2024 상반기 결산 - 책복/도슨트북',
          content:
            '밀리에서 전자책 외에다양한 독서 콘텐츠를 빼놓을 수 없죠! 😉밀리는 회원들의 일상생활에 독서가 1밀리 더스며들 수 있도록 다양한 도전을 이어가고 있어요. 챗북부터 도슨트북, 오브제북, 영상 콘텐츠까지!2024년 상반기에도 책을 쉽고, 재밌고, 풍성하게접할 수 있는 새로운 콘텐츠들이 쏟아졌는데요.과연 그중 어떤 콘텐츠가 주목받았는지함께 확인해 볼까요? 2024년의 상반기, 밀리 회원들이 좋아한 콘텐츠 랭킹을 보면 인간관계에 대한 관심이 높아진 것',
          author: mockUser.name,
          avatar: '/path/to/avatar1.jpg',
        },
        {
          title: '좋아하는 것들',
          content: '나만의 취향을 담은 독서 추천, 여러분과 함께 하고 싶어요.',
          author: mockUser.name,
          avatar: '/path/to/avatar1.jpg',
        },
      ],
      reviews: [
        {
          username: mockUser.name,
          date: '2024.08.01',
          content: '새롭네요!',
          likes: 1,
          rating: 4, // 별점 추가
        },
        {
          username: mockUser.name,
          date: '2024.02.27',
          content: '도슨트북 새롭고 재미있어요',
          likes: 1,
          rating: 5, // 별점 추가
        },
        {
          username: mockUser.name,
          date: '2024.10.16',
          content: '책에 더 흥미를 갖게 도와주는 것 같아요',
          likes: 1,
          rating: 3, // 별점 추가
        },
      ],
    });
  }),
  http.get(`/api/user/:userId/feeds/liked`, () => {
    return HttpResponse.json({
      posts: [
        {
          title: '2월은 결심하기 좋은 자기계발의 달!',
          content:
            '2024년에도 어김없이 결심의 시즌이 돌아왔습니다! 여러분을 위한 특별한 추천 도서를 소개합니다.',
          author: 'MILLIE 밀리',
          avatar: '/path/to/avatar1.jpg',
        },
        {
          title: '✨ 2024 상반기 결산 - 책복/도슨트북',
          content:
            '밀리에서 전자책 외에다양한 독서 콘텐츠를 빼놓을 수 없죠! 😉밀리는 회원들의 일상생활에 독서가 1밀리 더스며들 수 있도록 다양한 도전을 이어가고 있어요. 챗북부터 도슨트북, 오브제북, 영상 콘텐츠까지!2024년 상반기에도 책을 쉽고, 재밌고, 풍성하게접할 수 있는 새로운 콘텐츠들이 쏟아졌는데요.과연 그중 어떤 콘텐츠가 주목받았는지함께 확인해 볼까요? 2024년의 상반기, 밀리 회원들이 좋아한 콘텐츠 랭킹을 보면 인간관계에 대한 관심이 높아진 것',
          author: '밀리 독서연구소',
          avatar: '/path/to/avatar2.jpg',
        },
        {
          title: '좋아하는 것들',
          content: '나만의 취향을 담은 독서 추천, 여러분과 함께 하고 싶어요.',
          author: '16층 노예',
          avatar: '/path/to/avatar3.jpg',
        },
      ],
      reviews: [
        {
          username: 'Lovely ChaeChae',
          date: '2024.08.01',
          content: '새롭네요!',
          likes: 1,
          rating: 4, // 별점 추가
        },
        {
          username: '독서왕난이',
          date: '2024.02.27',
          content: '도슨트북 새롭고 재미있어요',
          likes: 1,
          rating: 5, // 별점 추가
        },
        {
          username: '다비다나고양이',
          date: '2024.10.16',
          content: '책에 더 흥미를 갖게 도와주는 것 같아요',
          likes: 1,
          rating: 3, // 별점 추가
        },
      ],
    });
  }),
  http.post('/api/user/:userId/password-check', async ({ request }) => {
    const { password } = (await request.json()) as { password: string };

    const isPasswordCorrect = password === 'P@ssw0rd1!';

    if (isPasswordCorrect) {
      return HttpResponse.json(
        {
          success: true,
          message: '비밀번호 확인 완료',
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      {
        success: false,
        message: '비밀번호가 일치하지 않습니다.',
      },
      { status: 401 },
    );
  }),

  http.get('/api/user/:userId', ({ params }) => {
    const { userId } = params;

    return HttpResponse.json(
      {
        userId,
        name: mockUser.name,
        phone: mockUser.phone,
        avatarUrl: mockUser.avatarUrl,
      },
      { status: 200 },
    );
  }),

  http.put('/api/user/:userId', async ({ params, request }) => {
    const { userId } = params;
    const updatedField = (await request.json()) as Partial<typeof mockUser>;

    return HttpResponse.json(
      {
        success: true,
        message: '개인 정보 수정이 완료되었습니다.',
        data: {
          userId,
          ...updatedField,
        },
      },
      { status: 200 },
    );
  }),

  http.post('/api/user/:userId/avatar', async ({ params, request }) => {
    const { userId } = params;

    const formData = await request.formData();
    const file = formData.get('avatar');

    if (!file || !(file instanceof File)) {
      return HttpResponse.json(
        {
          success: false,
          message: '올바른 이미지를 업로드해주세요.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        message: '성공적으로 업로드되었습니다.',
        avatarUrl: mockUser.avatarUrl,
      },
      { status: 200 },
    );
  }),

  http.delete('/api/user/:userId/avatar', async () => {
    return HttpResponse.json(
      {
        success: true,
        message: '성공적으로 삭제되었습니다.',
      },
      { status: 200 },
    );
  }),
];
