-- Table pour les emails autorisés à créer un compte
CREATE TABLE IF NOT EXISTS allowed_signup_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT
);

-- Index pour les recherches rapides par email
CREATE INDEX IF NOT EXISTS idx_allowed_signup_emails_email 
ON allowed_signup_emails(LOWER(email));

-- RLS Policies
ALTER TABLE allowed_signup_emails ENABLE ROW LEVEL SECURITY;

-- Politique: Les emails autorisés peuvent lire la liste (pour vérification au signup)
CREATE POLICY "Public can read allowed emails for signup check"
ON allowed_signup_emails FOR SELECT
TO public
USING (true);

-- Politique: Seuls les administrateurs authentifiés peuvent gérer la liste
CREATE POLICY "Only authenticated users can insert"
ON allowed_signup_emails FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE LOWER(admin_users.email) = LOWER(auth.jwt()->>'email')
  )
);

CREATE POLICY "Only authenticated admins can update"
ON allowed_signup_emails FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE LOWER(admin_users.email) = LOWER(auth.jwt()->>'email')
  )
);

CREATE POLICY "Only authenticated admins can delete"
ON allowed_signup_emails FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE LOWER(admin_users.email) = LOWER(auth.jwt()->>'email')
  )
);
