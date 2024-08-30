CREATE SCHEMA IF NOT EXISTS family;

CREATE TABLE family (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(25),
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_family_updated_at
BEFORE UPDATE on family
FOR EACH ROW
  EXECUTE PROCEDURE update_timestamp();
