-- Te Aho Matatū σ-test session log
-- Run this in the Supabase SQL editor for your project

CREATE TABLE IF NOT EXISTS tam_sessions (
  id              text PRIMARY KEY,
  created_at      timestamptz NOT NULL DEFAULT now(),
  condition       text NOT NULL CHECK (condition IN ('up', 'down')),
  state_valence   int2 NOT NULL CHECK (state_valence BETWEEN -5 AND 5),
  tarot_card      text NOT NULL,
  tarot_valence   int2 NOT NULL,
  tarot_dir_hit   boolean,
  playing_card    text NOT NULL,
  playing_valence int2 NOT NULL,
  playing_dir_hit boolean,
  youtube_url     text,
  youtube_id      text,
  note            text
);

ALTER TABLE tam_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can read sessions (public experiment log)
CREATE POLICY "public_select" ON tam_sessions
  FOR SELECT USING (true);

-- Insert/update/delete are denied to anon — handled by the server route
-- using the service role key, which bypasses RLS.
