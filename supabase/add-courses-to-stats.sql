-- Add courses column to stats table
ALTER TABLE stats ADD COLUMN IF NOT EXISTS total_courses INTEGER DEFAULT 0;

-- Update the initial stats row to include courses count
UPDATE stats 
SET total_courses = (SELECT COUNT(*) FROM courses)
WHERE id = (SELECT id FROM stats LIMIT 1);

