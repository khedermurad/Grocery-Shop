import { Product } from './product';

export interface PaginatedProductResponse {
  content: Product[];
  totalElements: number; // number of products
  totalPages: number; // number of pages
  number: number; // current page
  size: number; // number of elements per pag
  first: boolean; // first page?
  last: boolean; // last page?
}
