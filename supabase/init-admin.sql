-- ============================================
-- SCRIPT D'INITIALISATION ADMIN
-- ============================================
-- À exécuter dans Supabase SQL Editor après les migrations
-- 
-- INSTRUCTIONS:
-- 1. Remplacez 'votre-email@example.com' par votre vraie adresse email
-- 2. Exécutez ce script dans SQL Editor (bouton Run ▶️)
-- 3. Allez dans Authentication > Users
-- 4. Créez un nouvel utilisateur avec le MÊME email
-- 5. Définissez un mot de passe fort
-- 6. Cochez "Auto Confirm User"
-- 7. Vous pouvez maintenant vous connecter sur /#admin
-- ============================================

-- Ajouter votre email à la whitelist admin
INSERT INTO admin_users (email) 
VALUES ('votre-email@example.com')
ON CONFLICT (email) DO NOTHING;

-- Vérifier que l'admin a bien été ajouté
SELECT * FROM admin_users;

-- ============================================
-- COMMANDES UTILES
-- ============================================

-- Lister tous les admins
-- SELECT * FROM admin_users;

-- Ajouter un autre admin
-- INSERT INTO admin_users (email) VALUES ('autre-admin@example.com');

-- Supprimer un admin
-- DELETE FROM admin_users WHERE email = 'email-a-supprimer@example.com';

-- Vérifier les policies de sécurité
-- SELECT * FROM pg_policies WHERE tablename = 'products';

-- Lister tous les produits
-- SELECT id, name, price, category, in_stock, featured FROM products;
