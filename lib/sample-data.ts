import { Product, Category } from '@/types/product';

export const sampleCategories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronic gadgets and devices',
    image_url: '/categories/electronics.jpg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Latest smartphones and accessories',
    parent_id: 1,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Laptops',
    slug: 'laptops',
    description: 'High-performance laptops and computers',
    parent_id: 1,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image_url: '/categories/fashion.jpg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Men\'s Clothing',
    slug: 'mens-clothing',
    description: 'Stylish clothes for men',
    parent_id: 4,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'Women\'s Clothing',
    slug: 'womens-clothing',
    description: 'Fashion-forward clothes for women',
    parent_id: 4,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Home improvement and garden essentials',
    image_url: '/categories/home.jpg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 8,
    name: 'Sports',
    slug: 'sports',
    description: 'Sports equipment and fitness gear',
    image_url: '/categories/sports.jpg',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const sampleBrands = [
  'Apple',
  'Samsung',
  'Nike',
  'Adidas',
  'Sony',
  'LG',
  'Canon',
  'Dell',
  'HP',
  'Lenovo',
  'Zara',
  'H&M',
  'IKEA',
  'Philips'
];

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    description: 'The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system.',
    price: 1199.99,
    compare_price: 1299.99,
    sku: 'IPHONE-15-PRO-MAX-256',
    inventory_count: 45,
    category_id: 2,
    images: [
      '/products/iphone-15-pro-1.jpg',
      '/products/iphone-15-pro-2.jpg',
      '/products/iphone-15-pro-3.jpg'
    ],
    variants: [
      {
        id: 'iphone-15-color-black',
        name: 'Color',
        type: 'color',
        value: 'black',
        inventory_count: 15
      },
      {
        id: 'iphone-15-color-white',
        name: 'Color',
        type: 'color',
        value: 'white',
        inventory_count: 20
      },
      {
        id: 'iphone-15-color-blue',
        name: 'Color',
        type: 'color',
        value: 'blue',
        inventory_count: 10
      }
    ],
    tags: ['new', 'bestseller', 'premium'],
    is_active: true,
    rating: 4.8,
    review_count: 324,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T14:30:00Z'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Flagship Android phone with S Pen, incredible cameras, and all-day battery life.',
    price: 1099.99,
    compare_price: 1199.99,
    sku: 'GALAXY-S24-ULTRA-512',
    inventory_count: 32,
    category_id: 2,
    images: [
      '/products/galaxy-s24-1.jpg',
      '/products/galaxy-s24-2.jpg'
    ],
    variants: [
      {
        id: 'galaxy-s24-color-black',
        name: 'Color',
        type: 'color',
        value: 'black',
        inventory_count: 12
      },
      {
        id: 'galaxy-s24-color-white',
        name: 'Color',
        type: 'color',
        value: 'white',
        inventory_count: 20
      }
    ],
    tags: ['new', 'android'],
    is_active: true,
    rating: 4.6,
    review_count: 189,
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-18T11:15:00Z'
  },
  {
    id: 3,
    name: 'MacBook Pro 14" M3',
    description: 'Supercharged for pros with M3 chip, Liquid Retina XDR display, and incredible performance.',
    price: 1999.99,
    compare_price: 2199.99,
    sku: 'MBP-14-M3-512',
    inventory_count: 18,
    category_id: 3,
    images: [
      '/products/macbook-pro-1.jpg',
      '/products/macbook-pro-2.jpg',
      '/products/macbook-pro-3.jpg'
    ],
    variants: [
      {
        id: 'mbp-color-silver',
        name: 'Color',
        type: 'color',
        value: 'silver',
        inventory_count: 8
      },
      {
        id: 'mbp-color-black',
        name: 'Color',
        type: 'color',
        value: 'black',
        inventory_count: 10
      }
    ],
    tags: ['new', 'professional', 'mac'],
    is_active: true,
    rating: 4.9,
    review_count: 156,
    created_at: '2024-01-12T15:30:00Z',
    updated_at: '2024-01-22T09:45:00Z'
  },
  {
    id: 4,
    name: 'Nike Air Max 270',
    description: 'Lifestyle shoes with Max Air unit and comfortable design for all-day wear.',
    price: 149.99,
    compare_price: 179.99,
    sku: 'NIKE-AM270-WHITE-10',
    inventory_count: 3,
    category_id: 8,
    images: [
      '/products/nike-air-max-1.jpg',
      '/products/nike-air-max-2.jpg'
    ],
    variants: [
      {
        id: 'nike-size-9',
        name: 'Size',
        type: 'size',
        value: '9',
        inventory_count: 1
      },
      {
        id: 'nike-size-10',
        name: 'Size',
        type: 'size',
        value: '10',
        inventory_count: 2
      },
      {
        id: 'nike-size-11',
        name: 'Size',
        type: 'size',
        value: '11',
        inventory_count: 0
      }
    ],
    tags: ['sale', 'shoes', 'sport'],
    is_active: true,
    rating: 4.4,
    review_count: 89,
    created_at: '2024-01-08T12:00:00Z',
    updated_at: '2024-01-25T16:20:00Z'
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling with premium comfort and exceptional sound quality.',
    price: 349.99,
    compare_price: 399.99,
    sku: 'SONY-WH1000XM5-BLK',
    inventory_count: 27,
    category_id: 1,
    images: [
      '/products/sony-headphones-1.jpg',
      '/products/sony-headphones-2.jpg'
    ],
    variants: [
      {
        id: 'sony-color-black',
        name: 'Color',
        type: 'color',
        value: 'black',
        inventory_count: 15
      },
      {
        id: 'sony-color-white',
        name: 'Color',
        type: 'color',
        value: 'white',
        inventory_count: 12
      }
    ],
    tags: ['bestseller', 'audio', 'premium'],
    is_active: true,
    rating: 4.7,
    review_count: 243,
    created_at: '2024-01-05T14:20:00Z',
    updated_at: '2024-01-19T10:30:00Z'
  },
  {
    id: 6,
    name: 'Levi\'s 501 Original Jeans',
    description: 'The original jean that started it all. Classic fit with straight leg and button fly.',
    price: 89.99,
    sku: 'LEVIS-501-BLUE-32x34',
    inventory_count: 0,
    category_id: 5,
    images: [
      '/products/levis-jeans-1.jpg',
      '/products/levis-jeans-2.jpg'
    ],
    variants: [
      {
        id: 'levis-size-30x32',
        name: 'Size',
        type: 'size',
        value: '30x32',
        inventory_count: 0
      },
      {
        id: 'levis-size-32x34',
        name: 'Size',
        type: 'size',
        value: '32x34',
        inventory_count: 0
      },
      {
        id: 'levis-size-34x36',
        name: 'Size',
        type: 'size',
        value: '34x36',
        inventory_count: 0
      }
    ],
    tags: ['classic', 'denim'],
    is_active: true,
    rating: 4.3,
    review_count: 76,
    created_at: '2024-01-03T11:15:00Z',
    updated_at: '2024-01-26T13:45:00Z'
  },
  {
    id: 7,
    name: 'IKEA FRIHETEN Corner Sofa',
    description: 'Corner sofa bed with storage, perfect for small spaces. Includes removable cover.',
    price: 549.99,
    sku: 'IKEA-FRIHETEN-GREY',
    inventory_count: 8,
    category_id: 7,
    images: [
      '/products/ikea-sofa-1.jpg',
      '/products/ikea-sofa-2.jpg',
      '/products/ikea-sofa-3.jpg'
    ],
    variants: [
      {
        id: 'sofa-color-grey',
        name: 'Color',
        type: 'color',
        value: 'grey',
        inventory_count: 5
      },
      {
        id: 'sofa-color-beige',
        name: 'Color',
        type: 'color',
        value: 'beige',
        inventory_count: 3
      }
    ],
    tags: ['furniture', 'storage'],
    is_active: true,
    rating: 4.2,
    review_count: 134,
    created_at: '2024-01-01T08:30:00Z',
    updated_at: '2024-01-20T15:10:00Z'
  },
  {
    id: 8,
    name: 'Adidas Ultraboost 23',
    description: 'Running shoes with responsive BOOST midsole and Primeknit upper for ultimate comfort.',
    price: 189.99,
    compare_price: 220.00,
    sku: 'ADIDAS-UB23-BLK-10',
    inventory_count: 22,
    category_id: 8,
    images: [
      '/products/adidas-ultraboost-1.jpg',
      '/products/adidas-ultraboost-2.jpg'
    ],
    variants: [
      {
        id: 'adidas-size-9',
        name: 'Size',
        type: 'size',
        value: '9',
        inventory_count: 7
      },
      {
        id: 'adidas-size-10',
        name: 'Size',
        type: 'size',
        value: '10',
        inventory_count: 8
      },
      {
        id: 'adidas-size-11',
        name: 'Size',
        type: 'size',
        value: '11',
        inventory_count: 7
      }
    ],
    tags: ['new', 'running', 'boost'],
    is_active: true,
    rating: 4.6,
    review_count: 97,
    created_at: '2024-01-14T16:45:00Z',
    updated_at: '2024-01-23T12:20:00Z'
  }
];