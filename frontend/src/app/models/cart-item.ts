import { Product } from './product';

export interface CartItem {
  id?: number;
  quantity: number;
  subtotalPrice?: number;
  //productId: number,
  product?: Product;
  //price: number
}
