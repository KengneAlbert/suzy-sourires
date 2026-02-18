-- ============================================
-- AJOUT compare_at_price + correction des contraintes NOT NULL
-- ============================================
-- Le formulaire produit utilise compare_at_price (prix barré)
-- mais cette colonne n'existait pas dans la table.
-- On assouplit aussi les contraintes NOT NULL sur description,
-- image_url et category qui peuvent être vides.

-- 1. Ajouter la colonne compare_at_price
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'compare_at_price'
  ) THEN
    ALTER TABLE products ADD COLUMN compare_at_price decimal(10, 2) DEFAULT NULL;
  END IF;
END $$;

-- 2. Rendre nullable les colonnes qui peuvent l'être
ALTER TABLE products ALTER COLUMN description DROP NOT NULL;
ALTER TABLE products ALTER COLUMN short_description DROP NOT NULL;
ALTER TABLE products ALTER COLUMN image_url DROP NOT NULL;
ALTER TABLE products ALTER COLUMN category DROP NOT NULL;
