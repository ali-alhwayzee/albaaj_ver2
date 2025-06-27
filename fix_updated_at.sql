-- SQL script to add or fix the updated_at column in the vehicles table

-- Check if the column already exists, if not add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'vehicles'
        AND column_name = 'updated_at'
    ) THEN
        -- Add the updated_at column with timestamp and timezone
        ALTER TABLE vehicles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
        
        -- Set default value for existing records to current timestamp
        UPDATE vehicles SET updated_at = NOW();
        
        RAISE NOTICE 'Column updated_at added to vehicles table';
    ELSE
        -- If column exists but might have wrong type or constraints
        ALTER TABLE vehicles ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE;
        
        -- Update any NULL values
        UPDATE vehicles SET updated_at = NOW() WHERE updated_at IS NULL;
        
        RAISE NOTICE 'Column updated_at fixed in vehicles table';
    END IF;
END $$;
