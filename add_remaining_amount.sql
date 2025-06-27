-- SQL script to add the missing remaining_amount column to the vehicles table

-- Check if the column already exists, if not add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'vehicles'
        AND column_name = 'remaining_amount'
    ) THEN
        -- Add the remaining_amount column
        ALTER TABLE vehicles ADD COLUMN remaining_amount FLOAT;
        
        -- Update existing records to calculate remaining_amount based on amount and paid_amount
        UPDATE vehicles 
        SET remaining_amount = amount - paid_amount 
        WHERE amount IS NOT NULL AND paid_amount IS NOT NULL;
        
        RAISE NOTICE 'Column remaining_amount added to vehicles table';
    ELSE
        RAISE NOTICE 'Column remaining_amount already exists in vehicles table';
    END IF;
END $$;
