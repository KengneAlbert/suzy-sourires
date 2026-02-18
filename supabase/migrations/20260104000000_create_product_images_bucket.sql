-- Migration pour créer le bucket Supabase Storage pour les images de produits
-- À exécuter une fois sur Supabase

-- 1. Créer le bucket public (accessible sans authentification)
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
) ON CONFLICT (id) DO NOTHING;

-- 2. Permettre l'upload public dans le bucket
CREATE POLICY "Public Upload product-images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'product-images');

-- 3. Permettre la lecture publique
CREATE POLICY "Public Access product-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- 4. Permettre la suppression seulement aux authentifiés (admins)
CREATE POLICY "Admin Delete product-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- 5. Permettre la mise à jour seulement aux authentifiés (admins)
CREATE POLICY "Admin Update product-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');
