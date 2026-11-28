# frontend-user

수집품을 사고파는 ReSpark 사용자 화면입니다. 취향과 수집품이 머무는 프리미엄 C2C를 보여 줍니다.

## 주요 기능

구현된 화면은 메인, 상품 목록, 상품 등록, 회원가입, 로그인입니다. 상품 데이터와 로그인 계정은 로컬 목업입니다.

- 메인(`/`): 상품 검색 제안, 카테고리 이동, 인기상품 5개, 신상품 5개, 찜
- 상품 목록(`/c/{slug}`): 헤더에서 고른 카테고리의 상품을 국가·판매 상태·가격으로 좁히고, 정렬과 페이지를 고릅니다. 판매 상태 기본값은 전체입니다. `/c/all`은 전체 카테고리입니다.
- 상품 등록(`/sell`): 사진·동영상 첨부, 대표 이미지, 상품 정보 입력, 미리보기, 매물 등록
- 회원가입(`/signup`): 이메일 인증, 비밀번호, 필수 약관 동의, 소셜 가입 전 약관 확인. 닉네임은 입력받지 않습니다.
- 로그인(`/login`): 이메일 로그인과 LINE, Google, X, Apple 소셜 로그인. 테스트 계정으로 로그인하기 전에는 헤더가 로그인·회원가입·언어만 보여 줍니다. 로그아웃 상태에서 회원 전용 화면으로 들어가면 로그인 안내 후 로그인 페이지로 이동합니다.
- 인기상품은 찜이 많은 순이고, 같으면 조회수가 높은 순입니다. 신상품은 등록일이 최근인 순입니다. 판매완료 상품은 메인 목록에서 빠집니다.
- 상품 등록에서 사진은 최대 10개까지 여러 장 선택할 수 있습니다. 사진을 첫 칸으로 옮기면 대표 이미지가 되고, 동영상은 대표가 되지 않습니다.
- 매물 등록을 완료하면 선택한 카테고리 경로(`/c/{slug}`)로 이동합니다.

화면 문구는 한국어만 사용합니다.

## 기술 스택

- TypeScript
- Next.js 16.4.6 (App Router)
- React 19.3.0
- Tailwind CSS 4
- lucide-react
- ESLint
- Prettier

## 디렉터리 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── (main)/
│   │   ├── layout.tsx
│   │   ├── page.tsx          # 메인
│   │   ├── c/[slug]/page.tsx # 상품 목록
│   │   └── sell/page.tsx     # 상품 등록
│   └── (guest)/
│       ├── layout.tsx
│       ├── login/page.tsx    # 로그인
│       └── signup/page.tsx   # 회원가입
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── pages/
├── features/
│   ├── auth/
│   └── product/
│       ├── api/
│       ├── mocks/
│       └── model/
└── shared/config/
```

`(main)` 라우트 그룹은 주소에 포함되지 않습니다. 헤더와 푸터는 `MainTemplate`이 감쌉니다.

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버 주소는 `http://localhost:3000`입니다.

```bash
npm run lint
npm run format
npm run build
npm run start
```

코드에서 읽는 환경변수는 없습니다. `.env` 파일은 Git에 올리지 않습니다.

## 협업 및 Git 브랜치 전략

브랜치는 `main`, `develop`, `feature`만 사용합니다.

- `main`: 배포
- `develop`: 개발 통합
- `feature/{이슈번호}-{작업내용}`: 기능 작업. 예: `feature/1-mainPage`, `feature/3-sellPage`

이슈를 만든 뒤 그 번호로 브랜치를 만듭니다. 이슈 종류와 관계없이 작업 브랜치는 `feature`입니다. 화면 작업이 끝나면 `develop`으로 PR을 요청합니다. PR 승인과 머지는 사람이 합니다.
