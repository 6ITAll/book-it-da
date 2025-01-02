import { http, HttpResponse } from 'msw';

export const genderAgeHandlers = [
  http.get('/api/gender-age/:itemId', ({ params }) => {
    const { itemId } = params;

    // Mock 데이터 (itemId별로 다르게 설정 가능)
    const mockData = {
      '40869703': [
        { age: '10대', male: 3.6, female: 3.2 },
        { age: '20대', male: 15.7, female: 17.8 },
        { age: '30대', male: 11.3, female: 13.8 },
        { age: '40대', male: 10.3, female: 10.6 },
        { age: '50대', male: 5.3, female: 5.0 },
        { age: '60대~', male: 1.3, female: 1.5 },
      ],
      '278770576': [
        { age: '10대', male: 2.5, female: 3.0 },
        { age: '20대', male: 3.7, female: 2.9 },
        { age: '30대', male: 8.3, female: 33.3 },
        { age: '40대', male: 5.3, female: 6.6 },
        { age: '50대', male: 42.3, female: 2.0 },
        { age: '60대~', male: 1.0, female: 0.5 },
      ],
      '354729513': [
        { age: '10대', male: 0, female: 0 },
        { age: '20대', male: 42, female: 0 },
        { age: '30대', male: 0, female: 0 },
        { age: '40대', male: 0, female: 0 },
        { age: '50대', male: 0, female: 0 },
        { age: '60대~', male: 0, female: 0 },
      ],
    };

    // 요청된 itemId에 해당하는 데이터가 있는지 확인
    const responseData = mockData[itemId as keyof typeof mockData];

    // 데이터가 없으면 모든 값을 0으로 설정
    const defaultData = [
      { age: '10대', male: 0, female: 0 },
      { age: '20대', male: 0, female: 0 },
      { age: '30대', male: 0, female: 0 },
      { age: '40대', male: 0, female: 0 },
      { age: '50대', male: 0, female: 0 },
      { age: '60대~', male: 0, female: 0 },
    ];

    // 데이터가 없을 경우 defaultData 반환
    return HttpResponse.json(responseData || defaultData, { status: 200 });
  }),
];
