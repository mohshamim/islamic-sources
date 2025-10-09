-- ============================================
-- ENHANCED COURSE MANAGEMENT SCHEMA
-- ============================================
-- This schema extends the existing courses schema to support rich content

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. COURSE LESSONS TABLE (Enhanced)
-- ============================================
-- Add rich content fields to existing course_lessons table
DO $$
BEGIN
    -- Add study_materials column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'course_lessons' AND column_name = 'study_materials'
    ) THEN
        ALTER TABLE course_lessons ADD COLUMN study_materials TEXT;
    END IF;

    -- Add practice_materials column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'course_lessons' AND column_name = 'practice_materials'
    ) THEN
        ALTER TABLE course_lessons ADD COLUMN practice_materials TEXT;
    END IF;

    -- Add video_transcript column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'course_lessons' AND column_name = 'video_transcript'
    ) THEN
        ALTER TABLE course_lessons ADD COLUMN video_transcript TEXT;
    END IF;

    -- Add learning_objectives column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'course_lessons' AND column_name = 'learning_objectives'
    ) THEN
        ALTER TABLE course_lessons ADD COLUMN learning_objectives TEXT[];
    END IF;

    -- Add prerequisites column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'course_lessons' AND column_name = 'prerequisites'
    ) THEN
        ALTER TABLE course_lessons ADD COLUMN prerequisites TEXT[];
    END IF;

    -- Add tags column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'course_lessons' AND column_name = 'tags'
    ) THEN
        ALTER TABLE course_lessons ADD COLUMN tags TEXT[];
    END IF;
END $$;

-- ============================================
-- 2. LESSON RESOURCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS lesson_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('pdf', 'image', 'video', 'link', 'document', 'audio', 'zip', 'other')),
    url TEXT NOT NULL,
    file_size INTEGER, -- File size in bytes
    file_extension VARCHAR(10),
    mime_type VARCHAR(100),
    is_downloadable BOOLEAN DEFAULT TRUE,
    is_preview BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. LESSON EXERCISES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS lesson_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('multiple_choice', 'true_false', 'fill_blank', 'essay', 'matching', 'drag_drop', 'practical')),
    content JSONB NOT NULL, -- Flexible JSON structure for different exercise types
    correct_answer JSONB, -- JSON structure for correct answers
    explanation TEXT, -- Explanation of the correct answer
    points INTEGER DEFAULT 1,
    time_limit_minutes INTEGER, -- Optional time limit
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. LESSON QUIZZES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS lesson_quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    instructions TEXT,
    passing_score INTEGER DEFAULT 70, -- Percentage
    time_limit_minutes INTEGER,
    max_attempts INTEGER DEFAULT 3,
    is_randomized BOOLEAN DEFAULT FALSE,
    show_correct_answers BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5. QUIZ QUESTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES lesson_quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'fill_blank', 'essay', 'matching')),
    options JSONB, -- For multiple choice, true/false options
    correct_answer JSONB NOT NULL,
    explanation TEXT,
    points INTEGER DEFAULT 1,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 6. COURSE ASSIGNMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS course_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT,
    assignment_type VARCHAR(50) NOT NULL CHECK (assignment_type IN ('written', 'project', 'presentation', 'practical', 'research')),
    due_date TIMESTAMP WITH TIME ZONE,
    max_points INTEGER DEFAULT 100,
    weight_percentage INTEGER DEFAULT 10, -- Weight in final grade
    is_required BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 7. COURSE ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS course_announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    is_important BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 8. COURSE DISCUSSION FORUMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS course_discussions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    created_by UUID, -- User ID (when user system is implemented)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 9. DISCUSSION POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS discussion_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discussion_id UUID NOT NULL REFERENCES course_discussions(id) ON DELETE CASCADE,
    parent_post_id UUID REFERENCES discussion_posts(id) ON DELETE CASCADE, -- For replies
    title VARCHAR(500),
    content TEXT NOT NULL,
    author_name VARCHAR(255), -- Temporary until user system is implemented
    author_email VARCHAR(255),
    is_solution BOOLEAN DEFAULT FALSE, -- Mark as solution to a question
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 10. COURSE CERTIFICATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS course_certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    certificate_template TEXT, -- HTML template for certificate
    requirements JSONB, -- Requirements to earn certificate
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Lesson Resources Indexes
CREATE INDEX IF NOT EXISTS idx_lesson_resources_lesson_id ON lesson_resources(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_resources_type ON lesson_resources(type);
CREATE INDEX IF NOT EXISTS idx_lesson_resources_order ON lesson_resources(lesson_id, order_index);

-- Lesson Exercises Indexes
CREATE INDEX IF NOT EXISTS idx_lesson_exercises_lesson_id ON lesson_exercises(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_exercises_type ON lesson_exercises(type);
CREATE INDEX IF NOT EXISTS idx_lesson_exercises_order ON lesson_exercises(lesson_id, order_index);

-- Lesson Quizzes Indexes
CREATE INDEX IF NOT EXISTS idx_lesson_quizzes_lesson_id ON lesson_quizzes(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_quizzes_order ON lesson_quizzes(lesson_id, order_index);

-- Quiz Questions Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_order ON quiz_questions(quiz_id, order_index);

-- Course Assignments Indexes
CREATE INDEX IF NOT EXISTS idx_course_assignments_course_id ON course_assignments(course_id);
CREATE INDEX IF NOT EXISTS idx_course_assignments_order ON course_assignments(course_id, order_index);

-- Course Announcements Indexes
CREATE INDEX IF NOT EXISTS idx_course_announcements_course_id ON course_announcements(course_id);
CREATE INDEX IF NOT EXISTS idx_course_announcements_created ON course_announcements(course_id, created_at DESC);

-- Course Discussions Indexes
CREATE INDEX IF NOT EXISTS idx_course_discussions_course_id ON course_discussions(course_id);
CREATE INDEX IF NOT EXISTS idx_course_discussions_created ON course_discussions(course_id, created_at DESC);

-- Discussion Posts Indexes
CREATE INDEX IF NOT EXISTS idx_discussion_posts_discussion_id ON discussion_posts(discussion_id);
CREATE INDEX IF NOT EXISTS idx_discussion_posts_parent ON discussion_posts(parent_post_id);
CREATE INDEX IF NOT EXISTS idx_discussion_posts_created ON discussion_posts(discussion_id, created_at DESC);

-- ============================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to all new tables
CREATE TRIGGER trigger_update_lesson_resources_updated_at
    BEFORE UPDATE ON lesson_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_lesson_exercises_updated_at
    BEFORE UPDATE ON lesson_exercises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_lesson_quizzes_updated_at
    BEFORE UPDATE ON lesson_quizzes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_quiz_questions_updated_at
    BEFORE UPDATE ON quiz_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_course_assignments_updated_at
    BEFORE UPDATE ON course_assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_course_announcements_updated_at
    BEFORE UPDATE ON course_announcements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_course_discussions_updated_at
    BEFORE UPDATE ON course_discussions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_discussion_posts_updated_at
    BEFORE UPDATE ON discussion_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_course_certificates_updated_at
    BEFORE UPDATE ON course_certificates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all new tables
ALTER TABLE lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_certificates ENABLE ROW LEVEL SECURITY;

-- Public read access for published courses
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

CREATE POLICY "Public read access for lesson quizzes" ON lesson_quizzes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM course_lessons cl
            JOIN course_modules cm ON cl.module_id = cm.id
            JOIN courses c ON cm.course_id = c.id
            WHERE cl.id = lesson_quizzes.lesson_id
            AND c.status = 'published'
        )
    );

CREATE POLICY "Public read access for quiz questions" ON quiz_questions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM lesson_quizzes lq
            JOIN course_lessons cl ON lq.lesson_id = cl.id
            JOIN course_modules cm ON cl.module_id = cm.id
            JOIN courses c ON cm.course_id = c.id
            WHERE lq.id = quiz_questions.quiz_id
            AND c.status = 'published'
        )
    );

CREATE POLICY "Public read access for course assignments" ON course_assignments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses c
            WHERE c.id = course_assignments.course_id
            AND c.status = 'published'
        )
    );

CREATE POLICY "Public read access for course announcements" ON course_announcements
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses c
            WHERE c.id = course_announcements.course_id
            AND c.status = 'published'
        )
    );

CREATE POLICY "Public read access for course discussions" ON course_discussions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses c
            WHERE c.id = course_discussions.course_id
            AND c.status = 'published'
        )
    );

CREATE POLICY "Public read access for discussion posts" ON discussion_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM course_discussions cd
            JOIN courses c ON cd.course_id = c.id
            WHERE cd.id = discussion_posts.discussion_id
            AND c.status = 'published'
        )
    );

CREATE POLICY "Public read access for course certificates" ON course_certificates
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses c
            WHERE c.id = course_certificates.course_id
            AND c.status = 'published'
        )
    );

-- ============================================
-- SAMPLE DATA FOR TESTING
-- ============================================

-- Insert sample lesson resources (will be populated in Phase A)
-- Insert sample lesson exercises (will be populated in Phase A)
-- Insert sample lesson quizzes (will be populated in Phase A)

-- ============================================
-- COMMENTS AND DOCUMENTATION
-- ============================================

COMMENT ON TABLE lesson_resources IS 'Resources associated with course lessons (PDFs, images, videos, links)';
COMMENT ON TABLE lesson_exercises IS 'Interactive exercises for course lessons';
COMMENT ON TABLE lesson_quizzes IS 'Quizzes and assessments for course lessons';
COMMENT ON TABLE quiz_questions IS 'Individual questions within quizzes';
COMMENT ON TABLE course_assignments IS 'Course assignments and projects';
COMMENT ON TABLE course_announcements IS 'Course announcements and updates';
COMMENT ON TABLE course_discussions IS 'Discussion forums for courses';
COMMENT ON TABLE discussion_posts IS 'Posts and replies in course discussions';
COMMENT ON TABLE course_certificates IS 'Certificate templates and requirements';

COMMENT ON COLUMN lesson_resources.type IS 'Type of resource: pdf, image, video, link, document, audio, zip, other';
COMMENT ON COLUMN lesson_exercises.type IS 'Type of exercise: multiple_choice, true_false, fill_blank, essay, matching, drag_drop, practical';
COMMENT ON COLUMN lesson_exercises.content IS 'JSON structure containing exercise content and configuration';
COMMENT ON COLUMN lesson_exercises.correct_answer IS 'JSON structure containing correct answers';
COMMENT ON COLUMN quiz_questions.options IS 'JSON array of options for multiple choice questions';
COMMENT ON COLUMN quiz_questions.correct_answer IS 'JSON structure containing correct answers';
COMMENT ON COLUMN course_assignments.assignment_type IS 'Type of assignment: written, project, presentation, practical, research';
COMMENT ON COLUMN course_certificates.requirements IS 'JSON structure defining certificate requirements';
