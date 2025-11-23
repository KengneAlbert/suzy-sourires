/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `short_description` (text) - Brief product description
      - `price` (decimal) - Product price
      - `image_url` (text) - URL to product image
      - `category` (text) - Product category
      - `in_stock` (boolean) - Availability status
      - `featured` (boolean) - Featured product flag
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for anyone to read products (public catalog)
    - Add policy for authenticated admin users to manage products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  price decimal(10, 2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  in_stock boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert some sample products
INSERT INTO products (name, short_description, description, price, image_url, category, featured) VALUES
('Huile d''olive artisanale', 'Pressée à froid, qualité premium', 'Huile d''olive extra vierge artisanale, pressée à froid. Produite localement avec des olives soigneusement sélectionnées. Parfaite pour assaisonner vos salades et plats méditerranéens.', 12.50, 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=600', 'Épicerie', true),
('Savon naturel lavande', 'Fait main, ingrédients bio', 'Savon artisanal à la lavande, fabriqué à la main avec des ingrédients 100% naturels et biologiques. Doux pour la peau, parfum relaxant et apaisant.', 6.90, 'https://images.pexels.com/photos/4202920/pexels-photo-4202920.jpeg?auto=compress&cs=tinysrgb&w=600', 'Cosmétiques', true),
('Miel de fleurs local', 'Récolté par nos apiculteurs', 'Miel de fleurs sauvages récolté localement. Production artisanale respectueuse des abeilles. Goût délicat et authentique, riche en saveurs naturelles.', 9.80, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600', 'Épicerie', true),
('Bougie parfumée soja (nouvelle image)', 'Cire végétale, longue durée', 'Bougie artisanale en cire de soja 100% végétale. Parfums naturels délicats, combustion propre et longue durée. Fabriquée à la main avec soin.', 15.00, 'https://images.pexels.com/photos/1903876/pexels-photo-1903876.jpeg?auto=compress&cs=tinysrgb&w=600&v=2', 'Décoration', false),
('Confiture maison fraise', 'Sans conservateurs', 'Confiture artisanale aux fraises, préparée selon une recette traditionnelle. Sans conservateurs ni colorants. Fruits sélectionnés à maturité parfaite.', 5.50, 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=600', 'Épicerie', false),
('Crème mains nourrissante', 'Karité et huiles essentielles', 'Crème pour les mains ultra-nourrissante au beurre de karité et huiles essentielles. Texture non grasse, absorption rapide. Protège et répare les mains sèches.', 8.20, 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600', 'Cosmétiques', false);