export interface Product {
  id: string;
  name: string;
  description: string | null;
  short_description?: string | null;
  price: number;
  compare_at_price?: number | null;
  image_url: string | null;
  images?: string[] | null;
  category: string | null;
  in_stock: boolean;
  featured?: boolean;
  created_at: string;
  updated_at?: string;
}
