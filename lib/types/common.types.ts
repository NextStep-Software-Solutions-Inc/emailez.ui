// Common/shared types
export interface PaginatedList<T> {
  items: T[] | null;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string | null;
  data?: T;
}

export interface DeleteResponse {
  success: boolean;
  message: string | null;
}

export interface Notification {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  id?: string;
}
