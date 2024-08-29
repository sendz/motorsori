-- Create or replace the function to update the 'updated_at' timestamp
CREATE or REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  -- Set the new value of 'updated_at' to the current timestamp
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SCHEMA IF NOT EXISTS profiles;

CREATE TABLE profiles (
  id uuid primary key default uuid_generate_v4(),
  first_name varchar(25),
  last_name varchar(25),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create triggers for automatic timestamp updates on update
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Can only view own profile data"
  ON public.profiles
  FOR SELECT
    USING ( auth.uid() = id );

CREATE POLICY "Can only update own profile data"
  ON public.profiles
  FOR UPDATE
    USING ( auth.uid() = id );

CREATE OR REPLACE FUNCTION create_profile() 
RETURNS TRIGGER AS $$
  BEGIN INSERT INTO public.profiles (id, first_name, last_name)
    values (
      NEW.id,
      NEW.raw_user_meta_data ->> 'first_name',
      NEW.raw_user_meta_data ->> 'last_name'
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_profile_trigger
AFTER
  INSERT ON auth.users FOR EACH ROW WHEN (
    NEW.raw_user_meta_data IS NOT NULL
  ) EXECUTE FUNCTION create_profile();
