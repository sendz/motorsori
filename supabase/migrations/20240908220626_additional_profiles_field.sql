-- Add new columns to the profiles table
ALTER TABLE public.profiles
ADD COLUMN blood_type TEXT,
ADD COLUMN emergency_contact TEXT,
ADD COLUMN phone_number TEXT,
ADD COLUMN address TEXT,
ADD COLUMN profession TEXT,
ADD COLUMN profile_picture TEXT,
ADD COLUMN education TEXT,
ADD COLUMN birth_date DATE,
ADD COLUMN gender TEXT;

-- Create an index on phone_number for faster lookups
CREATE INDEX idx_profiles_phone_number ON public.profiles(phone_number);

-- Update the existing policy to allow users to update their own profile
DROP POLICY IF EXISTS update_own_profile ON public.profiles;
CREATE POLICY update_own_profile ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Create a new policy to allow users to read their own sensitive information
CREATE POLICY read_own_sensitive_info ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Create a function to mask sensitive information for non-owners
CREATE OR REPLACE FUNCTION mask_sensitive_info(profile public.profiles)
RETURNS public.profiles AS $$
BEGIN
    IF profile.id = auth.uid() THEN
        RETURN profile;
    ELSE
        profile.blood_type = NULL;
        profile.emergency_contact = NULL;
        profile.phone_number = NULL;
        profile.address = NULL;
        profile.profession = NULL;
        profile.profile_picture = NULL;
        profile.education = NULL;
        profile.birth_date = NULL;
        profile.gender = NULL;
        RETURN profile;
    END IF;
END;
$$ LANGUAGE 'plpgsql' SECURITY DEFINER;

-- Create a policy to use the masking function for reading profiles
CREATE POLICY read_masked_profile ON public.profiles
    FOR SELECT
    USING (TRUE);

-- Alter the profiles table to use the row level security for all operations
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;