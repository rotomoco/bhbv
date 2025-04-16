/*
  # Add admin approval system for registrations

  1. New Tables
    - `pending_registrations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `email` (text)
      - `created_at` (timestamp)
      - `status` (text): 'pending', 'approved', 'denied'
      
  2. Security
    - Enable RLS on `pending_registrations` table
    - Add policies for admins to manage registrations
*/

-- Create an admin flag in auth.users
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Create pending_registrations table
CREATE TABLE IF NOT EXISTS pending_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied'))
);

-- Enable RLS
ALTER TABLE pending_registrations ENABLE ROW LEVEL SECURITY;

-- Admins can read all pending registrations
CREATE POLICY "Admins can read pending registrations"
  ON pending_registrations
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.is_admin = true
  ));

-- Admins can update pending registrations
CREATE POLICY "Admins can update pending registrations"
  ON pending_registrations
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.is_admin = true
  ));

-- Users can see their own registration status
CREATE POLICY "Users can view their own registration status"
  ON pending_registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to handle registration approval
CREATE OR REPLACE FUNCTION approve_registration(registration_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the user executing is an admin
  IF NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Only admins can approve registrations';
  END IF;

  -- Update the registration status
  UPDATE pending_registrations
  SET status = 'approved'
  WHERE id = registration_id;
END;
$$;