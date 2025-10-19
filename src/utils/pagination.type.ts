export type PagedRequest = {
  search?: string;
  page?: number;
};
export type PagedResponse<T> = {
  data: T[];
  total: number;
};
