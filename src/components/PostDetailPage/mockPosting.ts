import { mockBooks } from '@components/FeedPage/mockPosts';

const mockPost = {
  id: 1,
  title: '포스팅 제목',
  content: `
  <p><strong>이 책을 처음 접했을 때의 느낌은 아직도 생생합니다.</strong></p>
  <h2>인상 깊었던 구절</h2>
  <blockquote>"가장 행복한 사람은 다른 사람의 행복을 위해 무언가를 하는 사람이다." - p.123</blockquote>
  <h2>책의 매력적인 부분</h2>
  <p>작가는 섬세한 묘사로 독자들을 이야기 속으로 끌어들입니다. 특히 다음과 같은 장면들이 인상적이었습니다:</p>
  <ul>
    <li>주인공의 내적 성장 과정</li>
    <li>갈등 해결 방식의 현실성</li>
    <li>감정 선의 자연스러운 흐름</li>
  </ul>
  <h2>개인적인 소감</h2>
  <p><span style="color: rgb(102, 102, 102);">이 책은 단순한 소설이 아닌, 삶의 진정한 의미를 되새기게 하는 거울과도 같았습니다.</span></p>
  <p><em>이 책을 읽으면서 느낀 감동을 오래도록 간직하고 싶습니다.</em></p>
  `,
  userId: 2,
  createdAt: '2024-01-15T09:00:00.000Z',
  book: {
    title: '금각사',
    author: '미시마 유키오',
    itemId: 107413605,
    imageUrl: mockBooks[0].imageUrl,
  },
  user: {
    id: 2,
    name: 'John Doe',
    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
  },
  isLiked: false,
};

export default mockPost;
