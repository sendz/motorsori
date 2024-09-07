-- Create profiles table
CREATE TABLE public.profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_profiles_email ON public.profiles(email);

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