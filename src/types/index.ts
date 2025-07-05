export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  sizes: string[];
  colors: string[];
  images: string[];
  stock: number;
  ratings: number;
  reviewCount: number;
  description: string;
  specifications: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  products: CartItem[];
  address: Address;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

export interface Address {
  name: string;
  mobile: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface FilterState {
  category: string[];
  brand: string[];
  priceRange: [number, number];
  size: string[];
  color: string[];
  rating: number;
}