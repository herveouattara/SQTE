/*
  # Système de réinitialisation de mot de passe et notifications

  1. Nouvelles Tables
    - `password_resets`
      - Gestion des demandes de réinitialisation
      - Tokens sécurisés et expiration
    - `admin_notifications`
      - Notifications pour l'administrateur
      - Stockage des informations d'inscription

  2. Security
    - Enable RLS
    - Politiques d'accès strictes
*/

-- Table des réinitialisations de mot de passe
CREATE TABLE password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '24 hours'),
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table des notifications administrateur
CREATE TABLE admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE password_resets ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own password resets" ON password_resets
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can read all notifications" ON admin_notifications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Indexes
CREATE INDEX password_resets_token_idx ON password_resets(token);
CREATE INDEX password_resets_user_id_idx ON password_resets(user_id);
CREATE INDEX admin_notifications_type_idx ON admin_notifications(type);
CREATE INDEX admin_notifications_read_idx ON admin_notifications(read);