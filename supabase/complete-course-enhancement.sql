-- ============================================
-- COMPLETE COURSE ENHANCEMENT MIGRATION
-- ============================================
-- This file contains everything needed to enhance the course management system
-- Run this entire file in Supabase SQL Editor to apply all changes at once

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PART 1: SCHEMA ENHANCEMENTS
-- ============================================

-- Add rich content fields to existing course_lessons table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_lessons' AND column_name = 'study_materials') THEN
        ALTER TABLE course_lessons ADD COLUMN study_materials TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_lessons' AND column_name = 'practice_materials') THEN
        ALTER TABLE course_lessons ADD COLUMN practice_materials TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_lessons' AND column_name = 'learning_objectives') THEN
        ALTER TABLE course_lessons ADD COLUMN learning_objectives TEXT[];
    END IF;
END $$;

-- Create lesson_resources table
CREATE TABLE IF NOT EXISTS lesson_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('pdf', 'image', 'video', 'link', 'document', 'audio', 'other')),
    url TEXT NOT NULL,
    is_downloadable BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create lesson_exercises table
CREATE TABLE IF NOT EXISTS lesson_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('multiple_choice', 'true_false', 'fill_blank', 'essay', 'matching')),
    content JSONB NOT NULL,
    correct_answer JSONB,
    explanation TEXT,
    points INTEGER DEFAULT 1,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_lesson_resources_lesson_id ON lesson_resources(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_exercises_lesson_id ON lesson_exercises(lesson_id);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS trigger_update_lesson_resources_updated_at ON lesson_resources;
CREATE TRIGGER trigger_update_lesson_resources_updated_at
    BEFORE UPDATE ON lesson_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_lesson_exercises_updated_at ON lesson_exercises;
CREATE TRIGGER trigger_update_lesson_exercises_updated_at
    BEFORE UPDATE ON lesson_exercises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_exercises ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
DROP POLICY IF EXISTS "Public read access for lesson resources" ON lesson_resources;
CREATE POLICY "Public read access for lesson resources" ON lesson_resources
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM course_lessons cl
            JOIN course_modules cm ON cl.module_id = cm.id
            JOIN courses c ON cm.course_id = c.id
            WHERE cl.id = lesson_resources.lesson_id
            AND c.status = 'published'
        )
    );

DROP POLICY IF EXISTS "Public read access for lesson exercises" ON lesson_exercises;
CREATE POLICY "Public read access for lesson exercises" ON lesson_exercises
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM course_lessons cl
            JOIN course_modules cm ON cl.module_id = cm.id
            JOIN courses c ON cm.course_id = c.id
            WHERE cl.id = lesson_exercises.lesson_id
            AND c.status = 'published'
        )
    );

-- ============================================
-- PART 2: SAMPLE CONTENT - SPOKEN ARABIC COURSE
-- ============================================

DO $$
DECLARE
    arabic_course_id UUID;
    module1_id UUID;
    module2_id UUID;
    lesson1_id UUID;
    lesson2_id UUID;
    lesson3_id UUID;
    lesson4_id UUID;
BEGIN
    -- Get the course ID for "Spoken Arabic for Beginners"
    SELECT id INTO arabic_course_id FROM courses WHERE slug = 'spoken-arabic-for-beginners';
    
    IF arabic_course_id IS NULL THEN
        RAISE NOTICE 'Course "Spoken Arabic for Beginners" not found. Skipping sample content.';
        RETURN;
    END IF;

    -- Delete existing modules and lessons for this course (clean slate)
    DELETE FROM course_modules WHERE course_id = arabic_course_id;

    -- Module 1: Basic Greetings and Introductions
    INSERT INTO course_modules (course_id, title, description, order_index)
    VALUES (
        arabic_course_id,
        'Basic Greetings and Introductions',
        'Learn essential Arabic greetings, polite expressions, and how to introduce yourself in Arabic.',
        1
    ) RETURNING id INTO module1_id;

    -- Module 2: Daily Conversations
    INSERT INTO course_modules (course_id, title, description, order_index)
    VALUES (
        arabic_course_id,
        'Daily Conversations',
        'Master common daily conversations including shopping, asking for directions, and ordering food.',
        2
    ) RETURNING id INTO module2_id;

    -- Lesson 1: Essential Greetings
    INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
    VALUES (
        module1_id,
        'Essential Greetings',
        'Learn the most important Arabic greetings and when to use them.',
        'video',
        'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        15,
        true,
        1,
        '<h3>Essential Arabic Greetings</h3>
<p>Arabic greetings are an important part of daily communication and show respect for others. Here are the most common ones:</p>
<ul>
    <li><strong>السلام عليكم (As-salamu alaykum)</strong> - Peace be upon you (most common greeting)</li>
    <li><strong>وعليكم السلام (Wa alaykum as-salam)</strong> - And peace be upon you (response)</li>
    <li><strong>أهلاً وسهلاً (Ahlan wa sahlan)</strong> - Welcome</li>
    <li><strong>مرحباً (Marhaban)</strong> - Hello</li>
    <li><strong>صباح الخير (Sabah al-khayr)</strong> - Good morning</li>
    <li><strong>مساء الخير (Masa al-khayr)</strong> - Good evening</li>
</ul>
<h4>Cultural Notes:</h4>
<p>When greeting someone in Arabic culture, it is customary to:</p>
<ul>
    <li>Use the right hand for handshakes</li>
    <li>Make eye contact and smile</li>
    <li>Wait for the other person to initiate physical contact</li>
    <li>Use appropriate greetings based on the time of day</li>
</ul>',
        '<h3>Practice Exercise: Greeting Scenarios</h3>
<p><strong>Scenario 1:</strong> You meet a friend in the morning at 9 AM. What greeting would you use?</p>
<p><strong>Answer:</strong> صباح الخير (Sabah al-khayr) - Good morning</p>

<p><strong>Scenario 2:</strong> Someone greets you with "السلام عليكم". How do you respond?</p>
<p><strong>Answer:</strong> وعليكم السلام (Wa alaykum as-salam)</p>

<p><strong>Scenario 3:</strong> A guest arrives at your home. What welcome greeting would you use?</p>
<p><strong>Answer:</strong> أهلاً وسهلاً (Ahlan wa sahlan) - Welcome</p>

<h4>Practice Phrases:</h4>
<ol>
    <li>Try greeting a family member using "السلام عليكم"</li>
    <li>Practice saying "أهلاً وسهلاً" when welcoming someone</li>
    <li>Use "صباح الخير" in the morning and "مساء الخير" in the evening</li>
</ol>',
        ARRAY['Learn basic Arabic greetings', 'Understand cultural context of greetings', 'Practice appropriate responses']
    ) RETURNING id INTO lesson1_id;

    -- Lesson 2: Introducing Yourself
    INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
    VALUES (
        module1_id,
        'Introducing Yourself',
        'Learn how to introduce yourself in Arabic with your name, occupation, and nationality.',
        'video',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        20,
        false,
        2,
        '<h3>Self-Introduction in Arabic</h3>
<p>When introducing yourself in Arabic, you will want to include basic information about yourself. Here are the key phrases:</p>

<h4>Basic Introduction Phrases:</h4>
<ul>
    <li><strong>أنا (Ana)</strong> - I am</li>
    <li><strong>اسمي (Ismi)</strong> - My name is</li>
    <li><strong>أنا من (Ana min)</strong> - I am from</li>
    <li><strong>أعمل في (Amal fi)</strong> - I work in</li>
    <li><strong>أدرس (Adrus)</strong> - I study</li>
</ul>

<h4>Example Introduction:</h4>
<p><strong>السلام عليكم، اسمي أحمد، أنا من مصر، وأعمل مهندس.</strong></p>
<p><em>Peace be upon you, my name is Ahmed, I am from Egypt, and I work as an engineer.</em></p>

<h4>Countries and Nationalities:</h4>
<ul>
    <li><strong>مصر (Misr)</strong> - Egypt / <strong>مصري (Misri)</strong> - Egyptian</li>
    <li><strong>السعودية (As-Saudiyya)</strong> - Saudi Arabia / <strong>سعودي (Saudi)</strong> - Saudi</li>
    <li><strong>الأردن (Al-Urdun)</strong> - Jordan / <strong>أردني (Urduni)</strong> - Jordanian</li>
    <li><strong>المغرب (Al-Maghrib)</strong> - Morocco / <strong>مغربي (Maghribi)</strong> - Moroccan</li>
</ul>',
        '<h3>Practice: Create Your Own Introduction</h3>
<p>Write and practice introducing yourself using the following template:</p>

<p><strong>Template:</strong></p>
<p>السلام عليكم، اسمي [Your Name]، أنا من [Your Country]، وأعمل [Your Job/Student].</p>

<h4>Practice Scenarios:</h4>
<ol>
    <li>Introduce yourself at a business meeting</li>
    <li>Introduce yourself to new neighbors</li>
    <li>Introduce yourself at a social gathering</li>
</ol>

<h4>Role Play Exercise:</h4>
<p>Practice with a partner - one person asks "ما اسمك؟" (What is your name?) and the other responds with a full introduction.</p>',
        ARRAY['Learn self-introduction phrases', 'Practice talking about nationality and occupation', 'Build confidence in basic conversations']
    ) RETURNING id INTO lesson2_id;

    -- Lesson 3: Shopping Conversations
    INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
    VALUES (
        module2_id,
        'Shopping Conversations',
        'Learn essential phrases for shopping, asking about prices, and making purchases.',
        'video',
        'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        25,
        false,
        1,
        '<h3>Shopping in Arabic</h3>
<p>Shopping is a common daily activity. Here are essential phrases you will need:</p>

<h4>Basic Shopping Phrases:</h4>
<ul>
    <li><strong>كم هذا؟ (Kam hatha?)</strong> - How much is this?</li>
    <li><strong>هل عندك...؟ (Hal indak...?)</strong> - Do you have...?</li>
    <li><strong>أريد أن أشتري (Ureed an ashtari)</strong> - I want to buy</li>
    <li><strong>أين أدفع؟ (Ayna adfa?)</strong> - Where do I pay?</li>
</ul>

<h4>Numbers and Prices:</h4>
<ul>
    <li><strong>واحد (Wahid)</strong> - One</li>
    <li><strong>اثنان (Ithnan)</strong> - Two</li>
    <li><strong>ثلاثة (Thalatha)</strong> - Three</li>
    <li><strong>عشرة (Ashara)</strong> - Ten</li>
    <li><strong>مائة (Mia)</strong> - One hundred</li>
</ul>',
        '<h3>Shopping Role Play</h3>
<p><strong>Scenario 1: Buying Fruits</strong></p>
<p>Customer: السلام عليكم، هل عندك تفاح؟</p>
<p>Shopkeeper: نعم، عندي تفاح أحمر وأخضر.</p>
<p>Customer: كم ثمن التفاح الأحمر؟</p>
<p>Shopkeeper: عشرة ريالات للكيلو.</p>

<h4>Practice Exercises:</h4>
<ol>
    <li>Practice asking for prices of different items</li>
    <li>Role play buying clothes at a store</li>
    <li>Practice negotiating prices politely</li>
</ol>',
        ARRAY['Master shopping vocabulary', 'Practice price negotiations', 'Learn currency terms']
    ) RETURNING id INTO lesson3_id;

    -- Lesson 4: Asking for Directions
    INSERT INTO course_lessons (module_id, title, description, type, content_url, duration_minutes, is_preview, order_index, study_materials, practice_materials, learning_objectives)
    VALUES (
        module2_id,
        'Asking for Directions',
        'Learn how to ask for and give directions in Arabic.',
        'video',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        20,
        false,
        2,
        '<h3>Asking for Directions in Arabic</h3>
<p>Getting lost is common when traveling. Here are essential phrases for asking directions:</p>

<h4>Asking for Directions:</h4>
<ul>
    <li><strong>أين...؟ (Ayna...?)</strong> - Where is...?</li>
    <li><strong>كيف أصل إلى...؟ (Kayf asil ila...?)</strong> - How do I get to...?</li>
    <li><strong>هل يمكنك مساعدتي؟ (Hal yumkinuka musaadati?)</strong> - Can you help me?</li>
</ul>

<h4>Directions:</h4>
<ul>
    <li><strong>يسار (Yasar)</strong> - Left</li>
    <li><strong>يمين (Yameen)</strong> - Right</li>
    <li><strong>مستقيم (Mustaqeem)</strong> - Straight</li>
</ul>',
        '<h3>Direction Practice Scenarios</h3>

<p><strong>Scenario 1: Finding the Hotel</strong></p>
<p>Tourist: السلام عليكم، أين الفندق الكبير؟</p>
<p>Local: الفندق الكبير؟ اذهب مستقيم ثم انعطف يسار.</p>
<p>Tourist: شكراً لك!</p>

<h4>Practice Exercises:</h4>
<ol>
    <li>Ask for directions to the nearest bank</li>
    <li>Practice giving directions to a tourist</li>
    <li>Learn to describe landmarks in Arabic</li>
</ol>',
        ARRAY['Learn direction vocabulary', 'Practice asking for help', 'Master location descriptions']
    ) RETURNING id INTO lesson4_id;

    -- Insert sample resources for lessons
    INSERT INTO lesson_resources (lesson_id, title, description, type, url, is_downloadable, order_index)
    VALUES 
    (lesson1_id, 'Arabic Greetings Cheat Sheet', 'Quick reference guide for Arabic greetings', 'pdf', 'https://example.com/arabic-greetings.pdf', true, 1),
    (lesson1_id, 'Cultural Greeting Etiquette', 'Video explaining cultural aspects of Arabic greetings', 'video', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', false, 2),
    (lesson2_id, 'Self-Introduction Template', 'Template for introducing yourself in Arabic', 'pdf', 'https://example.com/introduction-template.pdf', true, 1),
    (lesson3_id, 'Shopping Vocabulary List', 'Complete list of shopping-related Arabic vocabulary', 'pdf', 'https://example.com/shopping-vocab.pdf', true, 1),
    (lesson3_id, 'Arabic Numbers Guide', 'Learn Arabic numbers 1-100', 'pdf', 'https://example.com/arabic-numbers.pdf', true, 2),
    (lesson4_id, 'Direction Phrases Sheet', 'Essential phrases for asking directions', 'pdf', 'https://example.com/directions.pdf', true, 1);

    -- Insert sample exercises for lessons
    INSERT INTO lesson_exercises (lesson_id, title, description, type, content, correct_answer, explanation, points, order_index)
    VALUES 
    (lesson1_id, 'Greeting Matching Exercise', 'Match Arabic greetings with their English translations', 'matching', 
     '{"pairs": [{"arabic": "السلام عليكم", "english": "Peace be upon you"}, {"arabic": "أهلاً وسهلاً", "english": "Welcome"}, {"arabic": "صباح الخير", "english": "Good morning"}]}'::jsonb,
     '{"matches": [{"arabic": "السلام عليكم", "english": "Peace be upon you"}, {"arabic": "أهلاً وسهلاً", "english": "Welcome"}, {"arabic": "صباح الخير", "english": "Good morning"}]}'::jsonb,
     'These are the most common Arabic greetings used in daily conversation.', 10, 1),
    
    (lesson2_id, 'Self-Introduction Fill-in-the-Blank', 'Complete the self-introduction with appropriate words', 'fill_blank',
     '{"text": "السلام عليكم، اسمي [blank1]، أنا من [blank2]، وأعمل [blank3].", "blanks": ["blank1", "blank2", "blank3"]}'::jsonb,
     '{"answers": {"blank1": "أحمد", "blank2": "مصر", "blank3": "مهندس"}}'::jsonb,
     'Practice using your own name, country, and occupation in the blanks.', 15, 1),
    
    (lesson3_id, 'Shopping Dialogue Multiple Choice', 'Choose the correct response in shopping scenarios', 'multiple_choice',
     '{"question": "You want to buy one kilo of apples. The shopkeeper tells you the price is 10 riyals per kilo. What should you say?", "options": ["أريد كيلو واحد", "هذا رخيص", "أين التفاح؟", "شكراً لك"]}'::jsonb,
     '{"correct": 0}'::jsonb,
     'The correct answer is "أريد كيلو واحد" which means "I want one kilo".', 10, 1);

    -- Update course duration (sum of all lesson durations)
    UPDATE courses 
    SET duration_minutes = 80 
    WHERE id = arabic_course_id;

    RAISE NOTICE 'Successfully created sample content for Spoken Arabic for Beginners course';
END $$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Display summary of what was created
DO $$
DECLARE
    table_count INTEGER;
    module_count INTEGER;
    lesson_count INTEGER;
    resource_count INTEGER;
    exercise_count INTEGER;
BEGIN
    -- Count new tables
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('lesson_resources', 'lesson_exercises');

    -- Count modules
    SELECT COUNT(*) INTO module_count FROM course_modules;

    -- Count lessons
    SELECT COUNT(*) INTO lesson_count FROM course_lessons;

    -- Count resources
    SELECT COUNT(*) INTO resource_count FROM lesson_resources;

    -- Count exercises
    SELECT COUNT(*) INTO exercise_count FROM lesson_exercises;

    RAISE NOTICE '===========================================';
    RAISE NOTICE 'MIGRATION COMPLETE!';
    RAISE NOTICE '===========================================';
    RAISE NOTICE 'New tables created: %', table_count;
    RAISE NOTICE 'Total modules: %', module_count;
    RAISE NOTICE 'Total lessons: %', lesson_count;
    RAISE NOTICE 'Total resources: %', resource_count;
    RAISE NOTICE 'Total exercises: %', exercise_count;
    RAISE NOTICE '===========================================';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Refresh your browser at: http://localhost:3000/dashboard/courses/spoken-arabic-for-beginners';
    RAISE NOTICE '2. You should now see the complete course syllabus with modules and lessons!';
    RAISE NOTICE '===========================================';
END $$;
