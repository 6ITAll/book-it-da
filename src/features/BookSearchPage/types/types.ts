/** bestBookGetApi.ts 관련 타입 */

// 알라딘 베스트셀러 관련 API 응답 타입
export interface BestBookResponse {
  item: Array<{
    isbn: string;
    title: string;
    cover: string;
    link: string; // 책 상세 페이지 링크
  }>;
}

/** bookDetailApi.ts 관련 타입 */

// 책 상세 응답 데이터
export interface BookDetailResponse {
  item: Array<{
    isbn: string;
    title: string;
    description: string;
    author: string;
    categoryName: string;
    pubDate: string;
    cover: string;
    link: string;
    subInfo: {
      subTitle: string;
    };
  }>;
}

/** bookSearchApi.ts 관련 타입 */

// 알라딘 상품 검색 Api 관련 인터페이스
export interface BookResponse {
  version: string;
  totalResults: number;
  item: Array<{
    isbn: string; // isbn
    title: string; // 제목
    author: string; // 저자
    cover: string; // 이미지
    priceStandard: number; // 정가 가격
    customerReviewRank: number; // 리뷰 점수
    link: string; // 알라딘 페이지 링크
  }>;
}

// 요청 파라미터 타입 정의
export interface SearchBooksParams {
  query: string; // 사용자 검색어
  page: number; // 페이지 넘버
  sort: string; // 정렬 기준
  maxResults?: number;
}

// 상품 조회 관련 인터페이스
export interface RatingInfoResponse {
  item: Array<{
    subInfo?: {
      ratingInfo?: {
        ratingCount: number; // 평가 인원 수
      };
    };
  }>;
}
