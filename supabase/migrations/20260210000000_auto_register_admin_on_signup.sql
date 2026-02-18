-- ============================================
-- AUTO-ENREGISTREMENT ADMIN AU SIGNUP
-- ============================================
-- Quand un email autorisé (allowed_signup_emails) crée un compte,
-- il est automatiquement ajouté dans admin_users.
-- Utilise SECURITY DEFINER pour bypasser les RLS.

-- Fonction RPC appelée après signup
CREATE OR REPLACE FUNCTION public.register_admin_from_signup(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Vérifier que l'email est dans la whitelist
  IF NOT EXISTS (
    SELECT 1 FROM allowed_signup_emails
    WHERE LOWER(email) = LOWER(user_email)
  ) THEN
    RETURN FALSE;
  END IF;

  -- Insérer dans admin_users (ignore si déjà présent)
  INSERT INTO admin_users (email)
  VALUES (LOWER(user_email))
  ON CONFLICT (email) DO NOTHING;

  RETURN TRUE;
END;
$$;

-- Permettre aux utilisateurs anon et authenticated d'appeler cette fonction
-- (le signup crée l'utilisateur mais il peut ne pas encore être authenticated
--  si mailer_autoconfirm = false)
GRANT EXECUTE ON FUNCTION public.register_admin_from_signup(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.register_admin_from_signup(TEXT) TO authenticated;
