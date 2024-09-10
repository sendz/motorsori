-- Use Postgres to create a profile picture bucket.
INSERT INTO storage.buckets
  (id, name, public)
VALUES
  ('avatars', 'avatars', false);

-- Use Postgres to create a public profile picture bucket for blog author avatar.
INSERT INTO storage.buckets
  (id, name, public)
VALUES
  ('public-avatars', 'public-avatars', true);
