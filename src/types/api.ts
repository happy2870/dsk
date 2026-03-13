// 공통 API 타입 정의
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type PaginationParams = {
  page: number;
  size: number;
};

export type PaginatedResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type InfinitePageResponse<T> = {
  items: T[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
};
