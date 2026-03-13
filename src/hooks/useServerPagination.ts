'use client';

import { useState, useCallback } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { PaginatedResponse } from '../types/api';

export interface UseServerPaginationOptions<T> {
  queryKey: unknown[];
  fetchFn: (page: number, size: number) => Promise<PaginatedResponse<T>>;
  defaultPage?: number;
  defaultSize?: number;
  enabled?: boolean;
}

export function useServerPagination<T>({
  queryKey,
  fetchFn,
  defaultPage = 0,
  defaultSize = 10,
  enabled = true,
}: UseServerPaginationOptions<T>) {
  const [page, setPageState] = useState(defaultPage);
  const [size, setSizeState] = useState(defaultSize);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [...queryKey, page, size],
    queryFn: () => fetchFn(page, size),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const setPage = useCallback((p: number) => {
    setPageState(p);
  }, []);

  const setSize = useCallback((s: number) => {
    setPageState(0);
    setSizeState(s);
  }, []);

  return {
    data: data?.content ?? [],
    page,
    size,
    totalElements: data?.totalElements ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    isFetching,
    setPage,
    setSize,
  };
}
