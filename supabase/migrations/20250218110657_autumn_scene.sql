/*
  # Ajout de fonctionnalités pour les événements

  1. Modifications
    - Ajout du compteur de participants aux événements
    - Ajout de la colonne image_url aux événements
    - Ajout de la table event_registrations

  2. Sécurité
    - Ajout de politiques RLS pour les événements
    - Ajout de politiques RLS pour les inscriptions
*/

-- Ajout de la colonne image_url aux événements
ALTER TABLE events ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Ajout d'une fonction pour compter les participants
CREATE OR REPLACE FUNCTION get_event_participants_count(event_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM event_registrations
    WHERE event_id = $1 AND status = 'confirmed'
  );
END;
$$ LANGUAGE plpgsql;

-- Mise à jour des politiques RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique des événements
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

-- Politique de création d'événements pour les admins
CREATE POLICY "Only admins can create events" ON events
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Politique de modification d'événements pour les admins
CREATE POLICY "Only admins can update events" ON events
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Politique de suppression d'événements pour les admins
CREATE POLICY "Only admins can delete events" ON events
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Politiques pour les inscriptions aux événements
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leurs propres inscriptions
CREATE POLICY "Users can view their own registrations" ON event_registrations
  FOR SELECT USING (auth.uid() = user_id);

-- Les utilisateurs peuvent s'inscrire aux événements
CREATE POLICY "Users can register for events" ON event_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent annuler leurs inscriptions
CREATE POLICY "Users can cancel their registrations" ON event_registrations
  FOR DELETE USING (auth.uid() = user_id);

-- Les admins peuvent voir toutes les inscriptions
CREATE POLICY "Admins can view all registrations" ON event_registrations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Indexes pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_status ON event_registrations(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);