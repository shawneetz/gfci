export interface Paged<T> {
  rows: T[];
  total: number;
  page: number;
  pageCount: number;
}
