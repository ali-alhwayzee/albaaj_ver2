-- SQL script to fix the category field in the vehicles table

-- Check if there's an enum type for vehicle category
DO $$
DECLARE
    enum_exists BOOLEAN;
BEGIN
    -- Check if there's a custom enum type being used
    SELECT EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE t.typname LIKE '%category%' AND t.typtype = 'e'
    ) INTO enum_exists;

    IF enum_exists THEN
        -- If an enum exists, we'll convert the column to text type
        RAISE NOTICE 'Converting category column from enum to text type';
        
        -- Create a temporary column
        ALTER TABLE vehicles ADD COLUMN category_temp TEXT;
        
        -- Copy data from the enum column to the text column
        UPDATE vehicles SET category_temp = category::TEXT;
        
        -- Drop the enum column
        ALTER TABLE vehicles DROP COLUMN category;
        
        -- Rename the text column to the original name
        ALTER TABLE vehicles RENAME COLUMN category_temp TO category;
        
        RAISE NOTICE 'Category column converted to TEXT type';
    ELSE
        -- If no enum exists, ensure the column is of text type
        RAISE NOTICE 'Ensuring category column is of TEXT type';
        
        -- Alter the column type to TEXT if it's not already
        ALTER TABLE vehicles ALTER COLUMN category TYPE TEXT;
        
        RAISE NOTICE 'Category column type set to TEXT';
    END IF;
END $$;
