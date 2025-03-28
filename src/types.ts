export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  gender: 'men' | 'women';
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}