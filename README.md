# [북잇다](https://www.bookitda.store) - 온라인 독서 커뮤니티 플랫폼

## 1. 기대 효과

### 1.1 서비스 기대 효과
- 독서 문화 활성화
- 개인화된 독서 경험
- 비판적 사고력 향상

### 1.2 개발자로서 성장 기대 효과
- 테스트 코드 작성 경험
- 협업 툴 활용(Github Project)
- UI 라이브러리 활용 경험(MUI)
- 서드파티 API 활용 경험(Aladin API)

## 2. 기능
<table>
  <thead>
    <tr>
      <th>페이지</th>
      <th>주요 기능</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>피드 페이지</td>
      <td>
        - 추천, 팔로워, 팔로잉 피드 분류<br>
        - 포스팅 및 한줄평 작성<br>
        - 좋아요 기능<br>
        - 책 상세 페이지 연결<br>
        - 포스팅 상세 보기
      </td>
    </tr>
    <tr>
      <td>검색 페이지</td>
      <td>
        - 알라딘 API 활용 베스트셀러 표시<br>
        - 검색 결과 표시<br>
        - 책 상세 페이지 연결
      </td>
    </tr>
    <tr>
      <td>책 상세 페이지</td>
      <td>
        - 포스팅 작성 기능<br>
        - 링크 공유 기능<br>
        - 구매 링크 제공<br>
        - 내 서재 담기 옵션<br>
        - 성별/연령별 인기 분포 정보 제공<br>
        - 리뷰 및 별점 작성 기능
      </td>
    </tr>
    <tr>
      <td>포스팅 작성 페이지</td>
      <td>
        - 책 검색 및 선택 기능<br>
        - 임시 저장 기능<br>
        - 포스팅 작성 폼 제공
      </td>
    </tr>
    <tr>
      <td>로그인 페이지</td>
      <td>
        - 일반 로그인<br>
        - 카카오 로그인<br>
        - 아이디 저장 기능<br>
        - 자동 로그인 기능
      </td>
    </tr>
    <tr>
      <td>마이페이지</td>
      <td>
        - 사용자 정보 및 통계 표시<br>
        - 서재 리스트 확인<br>
        - 작성/좋아요한 피드 확인<br>
        - 팔로워/팔로잉 관리
      </td>
    </tr>
    <tr>
      <td>개인 정보 수정 페이지</td>
      <td>
        - 프로필 이미지 수정<br>
        - 개인 정보 수정<br>
        - 수정 결과 알림 기능
      </td>
    </tr>
  </tbody>
</table>


### 3. 팀 구성 및 역할
<table>
    <tr>
        <td><strong>이종혁</strong></td>
        <td>
            - Github Project 세팅<br>
            - 피드페이지 구현<br>
            - 포스팅 작성 기능 구현<br>
            - 책장 페이지 구현<br>
            - API 문서화 <br>
            - MUI Theme 설정
        </td>
    </tr>
    <tr>
        <td><strong>김은지</strong></td>
        <td>
            - 프로젝트 생성 및 개발 환경 세팅<br>
            - 마이페이지 구현<br>
            - PR 템플릿 설정<br>
            - Eslint & Prettier 관리<br>
            - 배포 관련 세팅<br>
            - MSW, StoryBook 세팅
        </td>
    </tr>
    <tr>
        <td><strong>박혜정</strong></td>
        <td>
            - 로그인 & 회원가입 페이지 구현<br>
            - 레이아웃 구성<br>
            - 마이페이지 구현<br>
            - 발표 자료 준비 & 발표<br>
            - Route & Path 관리<br>
            - 패키지 관리
        </td>
    </tr>
    <tr>
        <td><strong>유현상</strong></td>
        <td>
            - 책 검색 페이지 구현<br>
            - 책 상세 페이지 구현<br>
            - Eslint, Prettier 초기 설정<br>
            - 커밋 템플릿 & 가이드 작성<br>
            - 프로젝트 구조 및 개발 환경 세팅<br>
            - MUI Theme 관리
            - 전체 프로젝트 렌더링 성능 관리
        </td>
    </tr>
</table>

## 4. 개발 환경 및 배포 URL

### 4.1 개발 환경
**:pencil: 언어:** TypeScript

**:books: 라이브러리:** React

**:paintbrush: 스타일:** emotion

**:art: UI 컴포넌트 라이브러리:** MUI

**:arrows_counterclockwise: 상태 관리 라이브러리:** Redux Toolkit

**:globe_with_meridians: 비동기 상태 관리 라이브러리:** RTK Query

**:handshake: 협업툴:** Github Project

**:gear: Node.js 버전:** lts/jod

**:rocket: 프로젝트 생성 도구:** Vite

**:mag: 코드 품질 검사:** Eslint, Prettier

**:test_tube:  테스트 툴:** Vitest, Cypress

### 4.2 배포 URL
- https://www.bookitda.store/

### 4.3 URL 구조
| 기능 | URL |
|------|-----|
| 메인 페이지 | `/` |
| 로그인 | `/login` |
| 회원가입 | `/signup` |
| 피드 | `/feed` |
| 책 검색 | `/search` |
| 마이페이지 | `/my-page` |
| 특정 사용자 마이페이지 | `/my-page/:userId` |
| 책장 페이지 | `/my-page/:userId/bookshelves/:bookShelvesId` |
| 좋아요한 포스트 더보기 | `/my-page/:userId/feeds/posts` |
| 좋아요한 리뷰 더보기 | `/my-page/:userId/feeds/reviews` |
| 계정 수정 | `/edit-account` |
| 비밀번호 확인 | `/edit-account/passwordChk` |
| 책 상세 페이지 | `/books/:itemId` |
| 책 리뷰 더보기 | `/books/:itemId/reviews` |
| 책 포스트 더보기 | `/books/:itemId/posts` |
| 포스팅 목록 | `/posting` |
| 포스팅 상세 | `/posting/:postingId` |
| 포스팅 작성 | `/posting/write` |
| 포스팅 수정 | `/posting/edit/:postingId` |
| 카카오 로그인 콜백 | `/oauth/kakao` |

## 5. API 명세
### [북잇다 API 명세](http://api-docs-bookitda.store/) 

## 6. 프로젝트 구조
```
📦book-it-da
┣ 📂public
┣ 📂src
┃ ┣ 📂assets
┃ ┣ 📂components
┃ ┃ ┣ 📂BookDetailPage
┃ ┃ ┣ 📂BookSearchPage
┃ ┃ ┣ 📂BookShelvesPage
┃ ┃ ┣ 📂commons
┃ ┃ ┣ 📂FeedPage
┃ ┃ ┣ 📂Header
┃ ┃ ┣ 📂LoginSignupPage
┃ ┃ ┣ 📂MyPage
┃ ┃ ┣ 📂PostingDetailPage
┃ ┃ ┗ 📂PostingWritePage
┃ ┣ 📂constants
┃ ┣ 📂features
┃ ┣ 📂hooks
┃ ┣ 📂mocks
┃ ┣ 📂pages
┃ ┣ 📂routes
┃ ┣ 📂shared
┃ ┣ 📂store
┃ ┣ 📂styles
┃ ┣ 📂utils
┃ ┣ 📜App.tsx
┃ ┗ 📜main.tsx
┣ 📜.env
┣ 📜package.json
┣ 📜README.md
┣ 📜tsconfig.json
┗ 📜vite.config.ts
```

## 7. 와이어프레임
### [북잇다 와이어프레임](https://www.figma.com/design/OfB5ssv758IYKh93oWoZ70/Untitled?node-id=0-1&p=f&t=9XEwmzeAYrTLsExK-0)

## 8. Architecture

## 9. 이슈 & 해결 방법

## 10. 개선해야 할 점 & 아쉬운 점
