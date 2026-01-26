
export enum Category {
  AKSESORE = 'Aksesorë',
  ARUSHA = 'Arusha Pelushi',
  AMBALAZHIM = 'Ambalazhim',
  BABY_SHOWER = 'Baby Shower',
  BEAUTY = 'Beauty & Nails',
  BALLONE = 'Ballonë',
  DEKORE = 'Dekore',
  FLORALE = 'Dekorime Florale',
  GIFT_BOX = 'Gift Box',
  LULE = 'Lule Artificiale',
  BIZHUTERI = 'Paketime Bizhuterish',
  QIRINJE = 'Qirinjë',
  RIBBON = 'Ribbon',
  TROTINETA = 'Trotineta',
  PISHINA = 'Pishina'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: Category;
  images: string[];
  colors: string[];
  sizes: string[];
  featured?: boolean;
  onSale?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}
