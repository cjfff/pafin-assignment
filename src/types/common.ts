export interface Response<T> {
  code: number;
  data?: T;
  message?: string;
  error?: any;
  stack?: string;
}

export interface PaginationResponseData<T> {
  total: number;
  page: number;
  size: number;
  list: T[];
}
