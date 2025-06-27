-- SQL script to add the missing created_at column to the vehicles table

-- Check if the column already exists, if not add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'vehicles'
        AND column_name = 'created_at'
    ) THEN
        -- Add the created_at column with timestamp and timezone
        ALTER TABLE vehicles ADD COLUMN created_at TIMESTAMP WITH TIME ZONE;
        
        -- Set default value for existing records to current timestamp
        UPDATE vehicles SET created_at = NOW();
        
        RAISE NOTICE 'Column created_at added to vehicles table';
    ELSE
        -- If column exists but might have wrong type or constraints
        ALTER TABLE vehicles ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE;
        
        -- Update any NULL values
        UPDATE vehicles SET created_at = NOW() WHERE created_at IS NULL;
        
        RAISE NOTICE 'Column created_at fixed in vehicles table';
    END IF;
END $$;
