-- Create families table
CREATE TABLE public.families (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create family_members table
CREATE TABLE public.family_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    family_id UUID NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'parent', 'children')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(family_id, profile_id)
);

-- Create indexes
CREATE INDEX idx_family_members_family_id ON public.family_members(family_id);
CREATE INDEX idx_family_members_profile_id ON public.family_members(profile_id);

-- Create triggers for updating updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_families_updated_at
    BEFORE UPDATE ON public.families
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_members_updated_at
    BEFORE UPDATE ON public.family_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

-- Create policies for families table
CREATE POLICY read_own_family ON public.families
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.family_members
            WHERE family_members.family_id = families.id
            AND family_members.profile_id = auth.uid()
        )
    );

CREATE POLICY insert_family ON public.families
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY update_own_family ON public.families
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.family_members
            WHERE family_members.family_id = families.id
            AND family_members.profile_id = auth.uid()
            AND family_members.role IN ('owner', 'parent')
        )
    );

-- Create policies for family_members table
CREATE POLICY read_own_family_members ON public.family_members
    FOR SELECT
    USING (
        profile_id = auth.uid() OR
        family_id IN (
            SELECT family_id FROM public.family_members
            WHERE profile_id = auth.uid()
        )
    );

-- Corrected insert_family_member policy
CREATE POLICY insert_family_member ON public.family_members
    FOR INSERT
    WITH CHECK (
        (
            -- Check if the user is an owner or parent of the family
            EXISTS (
                SELECT 1 FROM public.family_members
                WHERE family_id = family_members.family_id
                AND profile_id = auth.uid()
                AND role IN ('owner', 'parent')
            )
        ) OR (
            -- Allow creation of an owner if none exists for the family
            role = 'owner' AND NOT EXISTS (
                SELECT 1 FROM public.family_members
                WHERE family_id = family_members.family_id AND role = 'owner'
            )
        )
    );

CREATE POLICY update_family_member ON public.family_members
    FOR UPDATE
    USING (
        auth.uid() IN (
            SELECT profile_id FROM public.family_members
            WHERE family_id = family_members.family_id AND role IN ('owner', 'parent')
        )
    );

CREATE POLICY delete_family_member ON public.family_members
    FOR DELETE
    USING (
        auth.uid() IN (
            SELECT profile_id FROM public.family_members
            WHERE family_id = family_members.family_id AND role IN ('owner', 'parent')
        )
    );

-- Create a function to create a new family for a new user
CREATE OR REPLACE FUNCTION 
public.create_family_for_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_family_id UUID;
    v_first_name TEXT;
BEGIN
    RAISE LOG 'Creating family for new user: %, Raw meta: %', NEW.id, NEW.first_name;

    -- Safely extract first_name
    v_first_name := COALESCE(NEW.first_name, 'New User');

    -- Create a new family
    INSERT INTO public.families (name)
    VALUES (CONCAT(v_first_name, '''s Family'))
    RETURNING id INTO new_family_id;

    RAISE LOG 'Created family with ID: % for user: %', new_family_id, NEW.id;

    -- Add the new user as the owner of the family
    INSERT INTO public.family_members (family_id, profile_id, role)
    VALUES (new_family_id, NEW.id, 'owner');

    RAISE LOG 'Added user % as owner to family %', NEW.id, new_family_id;

    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error in create_family_for_new_user: %, SQLSTATE: %', SQLERRM, SQLSTATE;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to create a new family when a new user signs up
DROP TRIGGER IF EXISTS create_family_on_signup ON auth.users;
CREATE TRIGGER create_family_on_signup
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.create_family_for_new_user();
