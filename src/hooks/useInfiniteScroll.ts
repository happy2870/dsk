'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfinitePageResponse } from '../types/api';

export interface UseInfiniteScrollOptions<T> {
  queryKey: unknown[];
  fetchFn: (page: number, size: number) => Promise<InfinitePageResponse<T>>;
  size?: number;
  enabled?: boolean;
  /** IntersectionObserver root element (e.g. scroll container ref) */
  root?: React.RefObject<HTMLElement | null>;
  /** 트리거 감지 여유 거리 (px) */
  rootMargin?: string;
}

export function useInfiniteScroll<T>({
  queryKey,
  fetchFn,
  size = 20,
  enabled = true,
  root,
  rootMargin = '200px',
}: UseInfiniteScrollOptions<T>) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => fetchFn(pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    enabled,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { hasNextPage, fetchNextPage, isFetchingNextPage } = query;

  // IntersectionObserver로 sentinel 감지
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: root?.current ?? null,
        rootMargin,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, root, rootMargin]);

  // 모든 페이지의 items를 flat하게 합침
  const allItems = query.data?.pages.flatMap((p) => p.items) ?? [];
  const totalCount = query.data?.pages[0]?.totalCount ?? 0;

  return {
    items: allItems,
    totalCount,
    sentinelRef,
    isLoading: query.isLoading,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    fetchNextPage,
  };
}
