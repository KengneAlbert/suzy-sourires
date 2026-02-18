/*
  # Sécuriser l'accès admin aux produits
  
  1. Tables
    - Créer table `admin_users` pour gérer la whitelist des admins
  
  2. Sécurité
    - Remplacer les policies trop permissives par une vérification email admin
    - Restreindre INSERT/UPDATE/DELETE uniquement aux admins whitelistés
*/

-- Créer la table des utilisateurs admin
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Seuls les admins peuvent voir la liste des admins
CREATE POLICY "Admins can view admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Supprimer les anciennes policies trop permissives
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

-- Créer les nouvelles policies sécurisées
CREATE POLICY "Only admins can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Only admins can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Only admins can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Ajouter des contraintes de validation sur la table products
ALTER TABLE products
  ADD CONSTRAINT check_price_positive CHECK (price >= 0),
  ADD CONSTRAINT check_name_length CHECK (char_length(name) <= 200);

-- Insérer un admin par défaut (À CHANGER avec votre email)
-- Décommentez et mettez votre email admin
-- INSERT INTO admin_users (email) VALUES ('votre-email@example.com');
