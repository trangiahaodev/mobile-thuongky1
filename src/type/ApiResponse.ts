export interface ApiResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}
