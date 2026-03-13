# @happy2870/dsk

**Design System Kit** — A collection of reusable React UI components, hooks, and utilities built with TypeScript and Tailwind CSS.

## Features

- 40+ production-ready UI components
- 100+ SVG icon system with namespace pattern
- Custom hooks for table pagination, infinite scroll, and server-side data fetching
- Compound component patterns (Modal, Header, FormField)
- Full TypeScript support with strict types
- Tree-shakeable ESM/CJS dual output via tsup

## Installation

```bash
npm install @happy2870/dsk
```

### Peer Dependencies

```bash
npm install react react-dom clsx tailwind-merge
```

Optional peer dependencies (install only what you need):

```bash
npm install @tanstack/react-query  # for useServerPagination, useInfiniteScroll
npm install framer-motion          # for SideTabLayout animations
npm install zustand                # for createStore
npm install recharts               # for DonutChart, ScoreBarChart
npm install react-countup          # for StatCard animations
npm install react-tooltip          # for AppTooltip
npm install simplebar-react        # for Select scroll
```

## Usage

### Components

```tsx
import { Button, Modal, Badge, Table } from '@happy2870/dsk/components/ui';
import { Header, Footer } from '@happy2870/dsk/components/layout';
import { Icon } from '@happy2870/dsk/components/icons';

// Button variants
<Button variant="primary" size="md">Click me</Button>
<Button variant="ghost" size="sm">Cancel</Button>

// Icon namespace
<Icon.Edit size={20} />
<Icon.Search size={16} />

// Badge
<Badge variant="green">Active</Badge>
<Badge variant="red">Error</Badge>
```

### Hooks

```tsx
import { useTable } from '@happy2870/dsk/hooks';

const {
  paginatedData,
  currentPage,
  totalPages,
  selectedRows,
  handleSelectRow,
  handleSelectAll,
} = useTable({ data, rowKey: 'id', pageSize: 10 });
```

### Utilities

```tsx
import { cn, debounce } from '@happy2870/dsk/utils';

// Tailwind class merging
<div className={cn('p-4 bg-white', isActive && 'bg-blue-500')} />
```

### Providers

```tsx
import { QueryProvider, ConfirmModalProvider } from '@happy2870/dsk/providers';

function App() {
  return (
    <QueryProvider>
      <ConfirmModalProvider>
        {children}
      </ConfirmModalProvider>
    </QueryProvider>
  );
}
```

## Package Exports

| Path | Description |
|------|-------------|
| `@happy2870/dsk` | Root (utils, hooks, providers, stores) |
| `@happy2870/dsk/components/ui` | UI components (Button, Modal, Table, etc.) |
| `@happy2870/dsk/components/icons` | Icon system |
| `@happy2870/dsk/components/layout` | Layout components (Header, Footer, Title) |
| `@happy2870/dsk/components/error` | ErrorBoundary |
| `@happy2870/dsk/hooks` | Custom hooks |
| `@happy2870/dsk/providers` | React providers |
| `@happy2870/dsk/stores` | Zustand store helpers |
| `@happy2870/dsk/types` | TypeScript type definitions |
| `@happy2870/dsk/utils` | Utility functions |
| `@happy2870/dsk/constants` | Constants and design tokens |

## Components

### Form & Input
Button, IconButton, Input, Textarea, SearchInput, Checkbox, Radio, Toggle, Select, SearchSelect, MultiSearchSelect

### Display
Badge, StatCard, StatCardGrid, NoData, CautionBox, ExplainText, ValueTag, TruncatedCell, Spinner, LoadingOverlay

### Layout
Modal, ConfirmModal, Header, Footer, Title, FormField, SideTab, ButtonTabs, SegmentedTabs

### Data
Table, TablePagination, FilterDropdown, FilterAccordion, ColumnToggleGrid, CheckboxList, CheckListSection, SelectionList

### Feedback
Toast, AppTooltip, PageGuide

### Charts & Cards
DonutChart, ScoreBarChart, ConfigCard, DashboardCard, SummaryStatCard

## Tech Stack

- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **tsup** for library bundling
- **@floating-ui/react** for positioning
- **@dnd-kit** for drag-and-drop
- **driver.js** for onboarding guides

## License

MIT
