
import { Category, Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Buqetë Karafilash Artificiale – FUSH098',
    price: 4.00,
    description: 'Material i jashtëzakonshëm dhe i butë me cilësi të lartë.',
    category: Category.LULE,
    images: ['https://picsum.photos/seed/flowers1/800/1000'],
    colors: ['E kuqe'],
    sizes: ['Standard'],
    featured: true
  },
  {
    id: '2',
    name: 'Paketime Bizhuterish – FUSH057',
    price: 7.00,
    description: 'Kuti luksoze për bizhuteritë tuaja.',
    category: Category.BIZHUTERI,
    images: ['https://picsum.photos/seed/box1/800/1000'],
    colors: ['E kuqe'],
    sizes: ['M'],
    featured: true
  },
  {
    id: '3',
    name: 'Arusha Përqafime të Ëmbla',
    price: 25.00,
    oldPrice: 65.00,
    description: 'Material i jashtëzakonisht i butë, i sigurt për fëmijë.',
    category: Category.ARUSHA,
    images: ['https://picsum.photos/seed/bear1/800/1000'],
    colors: ['Rozë', 'Verdhë'],
    sizes: ['L'],
    featured: true,
    onSale: true,
    discount: 56
  },
  {
    id: '4',
    name: 'Trotinet – FUSH322',
    price: 13.00,
    oldPrice: 35.00,
    description: 'Trotinet i qëndrueshëm për fëmijë.',
    category: Category.TROTINETA,
    images: ['https://picsum.photos/seed/scoot/800/1000'],
    colors: ['Kaltër'],
    sizes: ['Adjustable'],
    onSale: true,
    discount: 56
  },
  // Shtimi i 26 produkteve të tjera automatikisht për të mbushur listën
  ...Array.from({ length: 26 }).map((_, i) => ({
    id: (i + 5).toString(),
    name: `Produkt FUSHA ${i + 5}`,
    price: 10 + i,
    description: 'Përshkrim i detajuar i produktit.',
    category: Object.values(Category)[i % Object.values(Category).length],
    images: [`https://picsum.photos/seed/fusha${i + 5}/800/1000`],
    colors: ['Black'],
    sizes: ['OS'],
    featured: i < 4
  }))
];
