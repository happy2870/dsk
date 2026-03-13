import { useState, useMemo, useCallback } from 'react';

export interface UseTableOptions<T> {
  data: T[];
  rowKey: keyof T;
  pageSize?: number;
}

export interface UseTableReturn<T> {
  // 데이터
  paginatedData: T[];
  totalCount: number;

  // 페이지네이션
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  pageSize: number;
  setPageSize: (size: number) => void;

  // 행 선택
  selectedRows: string[];
  setSelectedRows: (rows: string[]) => void;
  handleSelectAll: () => void;
  handleSelectRow: (id: string, ctrlKey?: boolean, shiftKey?: boolean) => void;
  isAllSelected: boolean;
  clearSelection: () => void;
}

export function useTable<T>(options: UseTableOptions<T>): UseTableReturn<T> {
  const { data, rowKey, pageSize: initialPageSize = 10 } = options;

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // 행 선택 상태
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
    null
  );

  // 전체 페이지 수
  const totalPages = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data.length, pageSize]
  );

  // 페이지네이션된 데이터
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  // 페이지 크기 변경 시 첫 페이지로 이동
  const handleSetPageSize = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  // 전체 선택/해제
  const handleSelectAll = useCallback(() => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((row) => String(row[rowKey])));
    }
  }, [paginatedData, rowKey, selectedRows.length]);

  // 행 선택 핸들러 (Ctrl/Shift 지원)
  const handleSelectRow = useCallback(
    (id: string, ctrlKey: boolean = false, shiftKey: boolean = false) => {
      const currentIndex = paginatedData.findIndex(
        (row) => String(row[rowKey]) === id
      );

      if (shiftKey && lastSelectedIndex !== null) {
        // Shift+클릭: 범위 선택
        const start = Math.min(lastSelectedIndex, currentIndex);
        const end = Math.max(lastSelectedIndex, currentIndex);
        const rangeIds = paginatedData
          .slice(start, end + 1)
          .map((row) => String(row[rowKey]));

        if (ctrlKey) {
          // Ctrl+Shift: 기존 선택에 범위 추가
          setSelectedRows((prev) => [...new Set([...prev, ...rangeIds])]);
        } else {
          // Shift만: 범위만 선택
          setSelectedRows(rangeIds);
        }
      } else if (ctrlKey) {
        // Ctrl+클릭: 다중 선택 (토글)
        setSelectedRows((prev) =>
          prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
        setLastSelectedIndex(currentIndex);
      } else {
        // 일반 클릭: 단일 선택
        setSelectedRows((prev) =>
          prev.includes(id) && prev.length === 1 ? [] : [id]
        );
        setLastSelectedIndex(currentIndex);
      }
    },
    [paginatedData, rowKey, lastSelectedIndex]
  );

  // 선택 초기화
  const clearSelection = useCallback(() => {
    setSelectedRows([]);
    setLastSelectedIndex(null);
  }, []);

  // 전체 선택 여부
  const isAllSelected =
    selectedRows.length === paginatedData.length && paginatedData.length > 0;

  return {
    // 데이터
    paginatedData,
    totalCount: data.length,

    // 페이지네이션
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    setPageSize: handleSetPageSize,

    // 행 선택
    selectedRows,
    setSelectedRows,
    handleSelectAll,
    handleSelectRow,
    isAllSelected,
    clearSelection,
  };
}
