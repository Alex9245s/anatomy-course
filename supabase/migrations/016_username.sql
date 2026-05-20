-- Add username column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- Allow anyone to look up email by username (for login flow only — no sensitive data exposed)
CREATE OR REPLACE FUNCTION public.get_email_by_username(p_username TEXT)
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email FROM profiles WHERE username = lower(trim(p_username)) LIMIT 1;
$$;

-- Grant execute to anon and authenticated
GRANT EXECUTE ON FUNCTION public.get_email_by_username(TEXT) TO anon, authenticated;
