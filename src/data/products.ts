import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Casual Cotton Shirt',
    brand: 'Roadster',
    category: 'shirts',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['blue', 'white', 'black'],
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    stock: 15,
    ratings: 4.2,
    reviewCount: 156,
    description: 'A comfortable and stylish cotton shirt perfect for casual wear.',
    specifications: {
      'Fabric': 'Cotton',
      'Fit': 'Regular',
      'Collar': 'Spread',
      'Sleeve': 'Full'
    }
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    brand: 'Levis',
    category: 'jeans',
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['blue', 'black', 'grey'],
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    stock: 25,
    ratings: 4.5,
    reviewCount: 289,
    description: 'Premium quality slim fit jeans with perfect stretch and comfort.',
    specifications: {
      'Fabric': 'Denim',
      'Fit': 'Slim',
      'Rise': 'Mid Rise',
      'Closure': 'Button Fly'
    }
  },
  {
    id: '3',
    name: 'Floral Print Dress',
    brand: 'Zara',
    category: 'dresses',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['pink', 'blue', 'white'],
    images: [
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    stock: 12,
    ratings: 4.3,
    reviewCount: 94,
    description: 'Beautiful floral print dress perfect for summer occasions.',
    specifications: {
      'Fabric': 'Cotton Blend',
      'Length': 'Mini',
      'Neckline': 'Round',
      'Sleeve': 'Short'
    }
  },
  {
    id: '4',
    name: 'Running Shoes',
    brand: 'Nike',
    category: 'shoes',
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['black', 'white', 'grey'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    stock: 30,
    ratings: 4.6,
    reviewCount: 421,
    description: 'High-performance running shoes with superior comfort and support.',
    specifications: {
      'Type': 'Running',
      'Sole': 'Rubber',
      'Upper': 'Mesh',
      'Cushioning': 'Air Max'
    }
  },
  {
    id: '5',
    name: 'Leather Jacket',
    brand: 'Zara',
    category: 'jackets',
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['black', 'brown'],
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    stock: 8,
    ratings: 4.4,
    reviewCount: 67,
    description: 'Premium leather jacket with classic design and superior quality.',
    specifications: {
      'Material': 'Genuine Leather',
      'Fit': 'Regular',
      'Closure': 'Zipper',
      'Lining': 'Polyester'
    }
  },
  {
    id: '6',
    name: 'Casual Sneakers',
    brand: 'Adidas',
    category: 'shoes',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['white', 'black', 'grey'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    stock: 20,
    ratings: 4.1,
    reviewCount: 234,
    description: 'Comfortable casual sneakers perfect for everyday wear.',
    specifications: {
      'Type': 'Casual',
      'Sole': 'Rubber',
      'Upper': 'Synthetic',
      'Closure': 'Lace'
    }
  }
];

export const categories = [
  { id: 'shirts', name: 'Shirts', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'jeans', name: 'Jeans', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'dresses', name: 'Dresses', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'shoes', name: 'Shoes', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 'jackets', name: 'Jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300' }
];

export const brands = ['Roadster', 'Levis', 'Zara', 'Nike', 'Adidas', 'H&M', 'Forever 21', 'Puma'];