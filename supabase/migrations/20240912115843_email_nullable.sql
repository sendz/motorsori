-- Modify the profiles table to allow null values for the email column
ALTER TABLE public.profiles
ALTER COLUMN email DROP NOT NULL;

-- Update the unique constraint on email to exclude null values
DROP INDEX IF EXISTS idx_profiles_email;
CREATE UNIQUE INDEX idx_profiles_email ON public.profiles (email) WHERE email IS NOT NULL;

-- Update any existing policies or functions that might depend on email being NOT NULL
-- For example, you might need to update the create_profile_for_new_user() function
-- to handle cases where email might be null
