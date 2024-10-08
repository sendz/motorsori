-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_first_name ON public.profiles(first_name);
CREATE INDEX idx_profiles_last_name ON public.profiles(last_name);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to read their own profile
CREATE POLICY read_own_profile ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Create a policy that allows users to update their own profile
CREATE POLICY update_own_profile ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Create a policy that allows new user creation during sign-up
CREATE POLICY create_profile ON public.profiles
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Create a function to update profile data from auth.users table
CREATE OR REPLACE FUNCTION
  public.create_profile_for_new_user()
  RETURNS TRIGGER AS
  $$
  DECLARE
    v_first_name TEXT;
    v_last_name TEXT;
    v_role TEXT;
    v_family_id UUID;
  BEGIN
  RAISE NOTICE 'Creating profile for user: %, %', NEW.id, NEW.raw_user_meta_data;
    -- Check if required fields exist
    IF NEW.raw_user_meta_data->>'first_name' IS NULL OR NEW.raw_user_meta_data->>'last_name' IS NULL THEN
      RAISE EXCEPTION 'Missing first_name or last_name in user metadata';
    END IF;

    v_first_name := NEW.raw_user_meta_data ->> 'first_name';
    v_last_name := NEW.raw_user_meta_data ->> 'last_name';
    v_family_id := (NEW.raw_user_meta_data ->> 'family_id')::UUID;

    INSERT INTO public.profiles (id, first_name, last_name, email)
    VALUES (
      NEW.id,
      v_first_name,
      v_last_name,
      NEW.email
    );

    IF v_family_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM public.families WHERE id = v_family_id) THEN
            RAISE EXCEPTION 'Family with id % does not exist', v_family_id;
        END IF;

        v_role := COALESCE(NEW.raw_user_meta_data ->> 'role', 'children');
        RAISE LOG 'Adding user % to family % with role %', NEW.id, v_family_id, v_role;
    ELSE
        INSERT INTO public.families (name)
        VALUES (CONCAT(v_first_name, '''s Family'))
        RETURNING id INTO v_family_id;

        v_role := 'owner';
        RAISE LOG 'Created family % for user %', v_family_id, NEW.id;
    END IF;

    INSERT INTO public.family_members (family_id, profile_id, role)
    VALUES (v_family_id, NEW.id, v_role);

    RAISE LOG 'Added user % to family % with role %', NEW.id, v_family_id, v_role;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update profile data from auth.users table
CREATE OR REPLACE TRIGGER
  create_profile_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION
    public.create_profile_for_new_user();

-- Create a function to update auth.users based on profile changes
CREATE OR REPLACE FUNCTION public.update_auth_users_on_profile_change()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_set(
        jsonb_set(
            raw_user_meta_data,
            '{first_name}',
            to_jsonb(NEW.first_name)
        ),
        '{last_name}',
        to_jsonb(NEW.last_name)
    )
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;


-- Create trigger to update auth.users based on profile changes
CREATE TRIGGER update_auth_users_on_profile_change
    AFTER UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_auth_users_on_profile_change();
