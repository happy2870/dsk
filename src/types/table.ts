import { ReactNode } from 'react';

export interface Column<T> {
  id: string;
  header: string | ReactNode;
  headerTitle?: string;
  sub?: string;
  accessor: keyof T | ((row: T) => ReactNode);
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T;
  // 체크박스 컬럼
  showCheckbox?: boolean;
  // 선택 관련
  selectable?: boolean;
  selectedRows?: string[];
  onRowSelect?: (id: string, ctrlKey: boolean, shiftKey: boolean) => void;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
  // 페이지네이션 표시 여부 (default: true)
  showPagination?: boolean;
  // 페이지네이션 설정
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  // 헤더 툴바 오른쪽 영역 (커스텀 버튼 등)
  toolbarActions?: ReactNode;
  // 이벤트
  onRowClick?: (row: T) => void;
  onRowDoubleClick?: (row: T) => void;
  // 스타일
  verticalBorder?: boolean;
  stickyFirstColumn?: boolean;
  className?: string;
  emptyMessage?: string;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// ============================================
// Group Table Types
// ============================================

/**
 * 그룹 테이블용 확장 Props
 * 부모 데이터에 자식 배열이 포함된 경우 사용
 *
 * @template TParent - 부모 행 데이터 타입
 * @template TChild - 자식 행 데이터 타입
 *
 * @example
 * ```tsx
 * interface ParentData {
 *   groupId: string;
 *   childScans: ChildData[];
 * }
 * interface ChildData {
 *   scanId: string;
 *   accountName: string;
 * }
 *
 * <Table<ParentData, ChildData>
 *   columns={parentColumns}
 *   data={parentData}
 *   rowKey="groupId"
 *   groupIdKey="childScans"
 *   childColumns={childColumns}
 *   childRowKey="scanId"
 *   defaultExpanded={false}
 * />
 * ```
 */
export interface GroupTableProps<TParent, TChild> extends Omit<TableProps<TParent>, 'data'> {
  data: TParent[];

  // 그룹 테이블 전용 속성

  /** 자식 데이터가 담긴 배열의 키 이름 (예: 'childScans') */
  groupIdKey?: keyof TParent;

  /** 자식 테이블의 컬럼 정의 */
  childColumns?: Column<TChild>[];

  /** 자식 행의 고유 키 */
  childRowKey?: keyof TChild;

  /** 그룹의 기본 펼침 상태 (기본값: false) */
  defaultExpanded?: boolean;

  /** 자식 행 클릭 이벤트 */
  onChildRowClick?: (row: TChild) => void;
}
