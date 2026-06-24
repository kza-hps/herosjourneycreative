-- Add tarot reversal column to tam_sessions
-- Run in the Neon SQL editor for this project

ALTER TABLE tam_sessions
  ADD COLUMN IF NOT EXISTS tarot_reversed boolean NOT NULL DEFAULT false;
