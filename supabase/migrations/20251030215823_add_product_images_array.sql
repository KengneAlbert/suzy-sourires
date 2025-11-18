/*
  # Add support for multiple product images

  1. Changes
    - Add `images` column (text array) to store multiple image URLs
    - Keep `image_url` as the primary/default image for backward compatibility
    - Set default value for `images` array
  
  2. Notes
    - The `image_url` field remains as the main product image
    - The `images` array can contain additional product images
    - If `images` is empty, the product page will use only `image_url`
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'images'
  ) THEN
    ALTER TABLE products ADD COLUMN images text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;
