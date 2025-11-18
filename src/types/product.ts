export interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  image_url: string;
  images?: string[];
  category: string;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
