-- Fix admin_users RLS policies
-- This migration replaces the overly restrictive policies with proper ones:
-- 1. Admin users can see ALL admins (needed for the whitelist page)
-- 2. Only existing admins can add/remove other admins
-- 3. Non-admins cannot self-promote

-- Drop old policies
DROP POLICY IF EXISTS "Admin users can read their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Admin users can read admin_users" ON admin_users;

-- SELECT: Authenticated admins can see ALL admin users
CREATE POLICY "Admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- INSERT: Only existing admins can add new admins
CREATE POLICY "Admins can add new admin users"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- UPDATE: Only existing admins can update admin records
CREATE POLICY "Admins can update admin users"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- DELETE: Only existing admins can remove other admins (but not themselves)
CREATE POLICY "Admins can remove other admin users"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
    AND email != (SELECT auth.jwt() ->> 'email')
  );

-- Fix allowed_signup_emails: ensure proper RLS
ALTER TABLE IF EXISTS allowed_signup_emails ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage allowed signup emails" ON allowed_signup_emails;

-- Only admins can read allowed signup emails
CREATE POLICY "Admins can read allowed signup emails"
  ON allowed_signup_emails
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- Only admins can insert allowed signup emails
CREATE POLICY "Admins can insert allowed signup emails"
  ON allowed_signup_emails
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- Only admins can delete allowed signup emails
CREATE POLICY "Admins can delete allowed signup emails"
  ON allowed_signup_emails
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );
