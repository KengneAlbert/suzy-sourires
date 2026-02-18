-- ============================================
-- SUPABASE - INITIALISATION ADMIN
-- ============================================
-- À exécuter APRÈS les migrations principales
-- pour ajouter les premiers utilisateurs admin

-- Admin par défaut avec email
-- À changer avec votre email réel:
INSERT INTO admin_users (email) VALUES ('admin@suzy-sourires.com')
ON CONFLICT (email) DO NOTHING;

-- Vérifier les admins insérés
SELECT email, created_at FROM admin_users;
