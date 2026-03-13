# @happy2870/dsk

**Design System Kit** — A collection of reusable React UI components, hooks, and utilities built with TypeScript and Tailwind CSS.

**디자인 시스템 킷** — TypeScript와 Tailwind CSS로 구축된 재사용 가능한 React UI 컴포넌트, 훅, 유틸리티 모음입니다.

## Features / 주요 기능

- 40+ production-ready UI components / 40개 이상의 프로덕션 레디 UI 컴포넌트
- 100+ SVG icon system with namespace pattern / 네임스페이스 패턴 기반 100개 이상의 SVG 아이콘
- Custom hooks for table pagination, infinite scroll, and server-side data fetching / 테이블 페이지네이션, 무한 스크롤, 서버 사이드 데이터 페칭을 위한 커스텀 훅
- Compound component patterns (Modal, Header, FormField) / 복합 컴포넌트 패턴 (Modal, Header, FormField)
- Full TypeScript support with strict types / 엄격한 타입의 완전한 TypeScript 지원
- Tree-shakeable ESM/CJS dual output via tsup / tsup을 통한 트리 셰이킹 가능한 ESM/CJS 이중 출력

## Installation / 설치

```bash
npm install @happy2870/dsk
```

### Peer Dependencies / 필수 의존성

```bash
npm install react react-dom clsx tailwind-merge
```

Optional peer dependencies (install only what you need):
선택적 의존성 (필요한 것만 설치하세요):

```bash
npm install @tanstack/react-query  # useServerPagination, useInfiniteScroll
npm install framer-motion          # SideTabLayout animations / 애니메이션
npm install zustand                # createStore
npm install recharts               # DonutChart, ScoreBarChart
npm install react-countup          # StatCard animations / 카운트업 애니메이션
npm install react-tooltip          # AppTooltip
npm install simplebar-react        # Select scroll / 스크롤
```

## Usage / 사용법

### Components / 컴포넌트

```tsx
import { Button, Modal, Badge, Table } from '@happy2870/dsk/components/ui';
import { Header, Footer } from '@happy2870/dsk/components/layout';
import { Icon } from '@happy2870/dsk/components/icons';

// Button variants / 버튼 변형
<Button variant="primary" size="md">Click me</Button>
<Button variant="ghost" size="sm">Cancel</Button>

// Icon namespace pattern / 아이콘 네임스페이스 패턴
<Icon.Edit size={20} />
<Icon.Search size={16} />

// Badge
<Badge variant="green">Active</Badge>
<Badge variant="red">Error</Badge>
```

### Hooks / 훅

```tsx
import { useTable } from '@happy2870/dsk/hooks';

// Client-side pagination with row selection (Ctrl/Shift support)
// Ctrl/Shift 키 지원 행 선택이 포함된 클라이언트 사이드 페이지네이션
const {
  paginatedData,
  currentPage,
  totalPages,
  selectedRows,
  handleSelectRow,
  handleSelectAll,
} = useTable({ data, rowKey: 'id', pageSize: 10 });
```

```tsx
import { useServerPagination } from '@happy2870/dsk/hooks';

// Server-side pagination with React Query
// React Query 기반 서버 사이드 페이지네이션
const { data, page, totalPages, isLoading, setPage } = useServerPagination({
  queryKey: ['users'],
  fetchFn: (page, size) => fetchUsers(page, size),
});
```

```tsx
import { useInfiniteScroll } from '@happy2870/dsk/hooks';

// Infinite scroll with IntersectionObserver + React Query
// IntersectionObserver + React Query 기반 무한 스크롤
const { items, sentinelRef, isLoading, hasNextPage } = useInfiniteScroll({
  queryKey: ['feed'],
  fetchFn: (page, size) => fetchFeed(page, size),
});
```

### Utilities / 유틸리티

```tsx
import { cn, debounce } from '@happy2870/dsk/utils';

// Tailwind class merging (clsx + tailwind-merge)
// Tailwind 클래스 병합
<div className={cn('p-4 bg-white', isActive && 'bg-blue-500')} />
```

### Providers / 프로바이더

```tsx
import { ConfirmModalProvider, useConfirmModal } from '@happy2870/dsk/providers';

// Wrap your app / 앱을 감싸세요
function App() {
  return (
    <ConfirmModalProvider>
      {children}
    </ConfirmModalProvider>
  );
}

// Use confirm modal anywhere / 어디서든 확인 모달 사용
const { confirm } = useConfirmModal();
const ok = await confirm({ title: 'Delete?', message: 'Are you sure?' });
```

### React Query Setup / React Query 설정

`useServerPagination` and `useInfiniteScroll` hooks require React Query.
This library does **not** include a QueryProvider — you should configure it in your app with your own settings.

`useServerPagination`과 `useInfiniteScroll` 훅은 React Query가 필요합니다.
이 라이브러리는 QueryProvider를 **포함하지 않습니다** — 앱에서 직접 설정하세요.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,  // adjust to your needs / 필요에 맞게 조정
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmModalProvider>
        {children}
      </ConfirmModalProvider>
    </QueryClientProvider>
  );
}
```

### Store / 스토어

```tsx
import { createStore, createPersistStore } from '@happy2870/dsk/stores';

// Zustand store with devtools (dev only)
// 개발 환경에서만 devtools가 적용되는 Zustand 스토어
const useCounterStore = createStore('counter', (set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));
```

## Package Exports / 패키지 내보내기

| Path / 경로 | Description / 설명 |
|------|-------------|
| `@happy2870/dsk` | Root — utils, hooks, providers, stores / 루트 |
| `@happy2870/dsk/components/ui` | UI components / UI 컴포넌트 (Button, Modal, Table 등) |
| `@happy2870/dsk/components/icons` | Icon system / 아이콘 시스템 |
| `@happy2870/dsk/components/layout` | Layout / 레이아웃 (Header, Footer, Title) |
| `@happy2870/dsk/components/error` | ErrorBoundary / 에러 바운더리 |
| `@happy2870/dsk/hooks` | Custom hooks / 커스텀 훅 |
| `@happy2870/dsk/providers` | React providers / 프로바이더 |
| `@happy2870/dsk/stores` | Zustand store helpers / 스토어 헬퍼 |
| `@happy2870/dsk/types` | TypeScript types / 타입 정의 |
| `@happy2870/dsk/utils` | Utility functions / 유틸리티 함수 |
| `@happy2870/dsk/constants` | Constants & design tokens / 상수 및 디자인 토큰 |

## Components / 컴포넌트 목록

### Form & Input / 폼 & 입력
Button, IconButton, Input, Textarea, SearchInput, Checkbox, Radio, Toggle, Select, SearchSelect, MultiSearchSelect

### Display / 표시
Badge, StatCard, StatCardGrid, NoData, CautionBox, ExplainText, ValueTag, TruncatedCell, Spinner, LoadingOverlay

### Layout / 레이아웃
Modal, ConfirmModal, Header, Footer, Title, FormField, SideTab, ButtonTabs, SegmentedTabs

### Data / 데이터
Table, TablePagination, FilterDropdown, FilterAccordion, ColumnToggleGrid, CheckboxList, CheckListSection, SelectionList

### Feedback / 피드백
Toast, AppTooltip, PageGuide

### Charts & Cards / 차트 & 카드
DonutChart, ScoreBarChart, ConfigCard, DashboardCard, SummaryStatCard

## Architecture / 아키텍처

```
src/
├── components/
│   ├── ui/              # UI components / UI 컴포넌트
│   │   ├── card/        # Card components / 카드 컴포넌트
│   │   ├── chart/       # Chart components / 차트 컴포넌트
│   │   ├── checklist/   # Checklist / 체크리스트
│   │   ├── filter/      # Filter components / 필터 컴포넌트
│   │   ├── portal-to-follow-elem/  # Floating UI wrapper
│   │   ├── table/       # Table components / 테이블 컴포넌트
│   │   ├── tabs/        # Tab components / 탭 컴포넌트
│   │   └── toast/       # Toast notifications / 토스트 알림
│   ├── icons/           # 100+ SVG icons / SVG 아이콘
│   ├── layout/          # Layout components / 레이아웃 컴포넌트
│   └── error/           # Error boundary / 에러 바운더리
├── hooks/               # Custom React hooks / 커스텀 훅
├── providers/           # Context providers / 컨텍스트 프로바이더
├── stores/              # Zustand store helpers / 스토어 헬퍼
├── types/               # TypeScript type definitions / 타입 정의
├── utils/               # Utility functions / 유틸리티 함수
└── constants/           # Design tokens & constants / 디자인 토큰 & 상수
```

## Design Patterns / 디자인 패턴

- **Compound Components** — Modal, Header, FormField use sub-component composition / 서브 컴포넌트 합성 패턴
- **Icon Namespace** — `Icon.Edit`, `Icon.Search` for intuitive access / 직관적 접근을 위한 네임스페이스
- **Tailwind-First** — No CSS files, pure utility class styling / CSS 파일 없이 유틸리티 클래스만 사용
- **Context-Based State** — FormField, Modal leverage React Context / React Context 활용
- **Ctrl/Shift Selection** — Table and MultiSearchSelect support range selection / 범위 선택 지원

## Tech Stack / 기술 스택

- **React 18+** with TypeScript
- **Tailwind CSS** for styling / 스타일링
- **tsup** for library bundling / 라이브러리 번들링
- **@floating-ui/react** for positioning / 포지셔닝
- **@dnd-kit** for drag-and-drop / 드래그 앤 드롭
- **driver.js** for onboarding guides / 온보딩 가이드

## License / 라이선스

MIT
