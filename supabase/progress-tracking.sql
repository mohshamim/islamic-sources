-- ============================================
-- PROGRESS TRACKING SYSTEM
-- ============================================
-- This schema enables tracking of user progress through courses

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USER ENROLLMENT TABLE (Simplified - no auth yet)
-- ============================================
-- This table tracks which "users" are enrolled in which courses
-- For now, we'll use session-based tracking until auth is implemented

CREATE TABLE IF NOT EXISTS course_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    user_session_id VARCHAR(255) NOT NULL, -- Temporary: browser session ID
    user_email VARCHAR(255), -- Optional: for tracking
    
    -- Progress metrics
    total_lessons INTEGER DEFAULT 0,
    completed_lessons INTEGER DEFAULT 0,
    progress_percentage INTEGER DEFAULT 0,
    
    -- Timestamps
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status VARCHAR(50) DEFAULT 'in_progress' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    
    -- Unique constraint
    UNIQUE(course_id, user_session_id)
);

-- ============================================
-- 2. LESSON COMPLETION TABLE
-- ============================================
-- Tracks which lessons a user has completed

CREATE TABLE IF NOT EXISTS lesson_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_progress_id UUID NOT NULL REFERENCES course_progress(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
    
    -- Completion data
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    time_spent_minutes INTEGER DEFAULT 0,
    
    -- Video progress (for video lessons)
    video_progress_percentage INTEGER DEFAULT 0,
    
    -- Quiz/Exercise scores (if applicable)
    score INTEGER,
    max_score INTEGER,
    
    -- Unique constraint
    UNIQUE(course_progress_id, lesson_id)
);

-- ============================================
-- 3. QUIZ SUBMISSIONS TABLE
-- ============================================
-- Tracks quiz attempts and scores

CREATE TABLE IF NOT EXISTS quiz_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_progress_id UUID NOT NULL REFERENCES course_progress(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
    
    -- Submission data
    answers JSONB NOT NULL, -- User's answers in JSON format
    score INTEGER DEFAULT 0,
    max_score INTEGER DEFAULT 0,
    percentage INTEGER DEFAULT 0,
    passed BOOLEAN DEFAULT FALSE,
    
    -- Attempt tracking
    attempt_number INTEGER DEFAULT 1,
    time_taken_minutes INTEGER DEFAULT 0,
    
    -- Timestamps
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    
    -- Feedback
    feedback TEXT
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_course_progress_course ON course_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_course_progress_session ON course_progress(user_session_id);
CREATE INDEX IF NOT EXISTS idx_course_progress_status ON course_progress(status);

CREATE INDEX IF NOT EXISTS idx_lesson_completions_progress ON lesson_completions(course_progress_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_lesson ON lesson_completions(lesson_id);

CREATE INDEX IF NOT EXISTS idx_quiz_submissions_progress ON quiz_submissions(course_progress_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_lesson ON quiz_submissions(lesson_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Function to update course progress percentage
CREATE OR REPLACE FUNCTION update_course_progress_percentage()
RETURNS TRIGGER AS $$
DECLARE
    v_course_progress_id UUID;
    v_total_lessons INTEGER;
    v_completed_lessons INTEGER;
    v_percentage INTEGER;
BEGIN
    -- Get course progress ID
    v_course_progress_id := NEW.course_progress_id;
    
    -- Count total lessons in the course
    SELECT COUNT(DISTINCT cl.id) INTO v_total_lessons
    FROM course_lessons cl
    JOIN course_modules cm ON cl.module_id = cm.id
    JOIN course_progress cp ON cm.course_id = cp.course_id
    WHERE cp.id = v_course_progress_id;
    
    -- Count completed lessons
    SELECT COUNT(*) INTO v_completed_lessons
    FROM lesson_completions
    WHERE course_progress_id = v_course_progress_id;
    
    -- Calculate percentage
    IF v_total_lessons > 0 THEN
        v_percentage := ROUND((v_completed_lessons::NUMERIC / v_total_lessons::NUMERIC) * 100);
    ELSE
        v_percentage := 0;
    END IF;
    
    -- Update course progress
    UPDATE course_progress
    SET 
        total_lessons = v_total_lessons,
        completed_lessons = v_completed_lessons,
        progress_percentage = v_percentage,
        last_accessed_at = CURRENT_TIMESTAMP,
        status = CASE 
            WHEN v_percentage >= 100 THEN 'completed'
            WHEN v_percentage > 0 THEN 'in_progress'
            ELSE 'not_started'
        END,
        completed_at = CASE 
            WHEN v_percentage >= 100 AND completed_at IS NULL THEN CURRENT_TIMESTAMP
            ELSE completed_at
        END
    WHERE id = v_course_progress_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to lesson_completions
DROP TRIGGER IF EXISTS trigger_update_course_progress_on_completion ON lesson_completions;
CREATE TRIGGER trigger_update_course_progress_on_completion
    AFTER INSERT OR DELETE ON lesson_completions
    FOR EACH ROW EXECUTE FUNCTION update_course_progress_percentage();

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Public can read their own progress (session-based)
CREATE POLICY "Users can view their own course progress" ON course_progress
    FOR SELECT USING (true); -- For now, allow all reads (will restrict by session later)

CREATE POLICY "Users can insert their own course progress" ON course_progress
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own course progress" ON course_progress
    FOR UPDATE USING (true);

CREATE POLICY "Users can view their own lesson completions" ON lesson_completions
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own lesson completions" ON lesson_completions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own quiz submissions" ON quiz_submissions
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own quiz submissions" ON quiz_submissions
    FOR INSERT WITH CHECK (true);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get or create course progress for a session
CREATE OR REPLACE FUNCTION get_or_create_course_progress(
    p_course_id UUID,
    p_session_id VARCHAR(255),
    p_user_email VARCHAR(255) DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_progress_id UUID;
BEGIN
    -- Try to get existing progress
    SELECT id INTO v_progress_id
    FROM course_progress
    WHERE course_id = p_course_id AND user_session_id = p_session_id;
    
    -- Create if doesn't exist
    IF v_progress_id IS NULL THEN
        INSERT INTO course_progress (course_id, user_session_id, user_email)
        VALUES (p_course_id, p_session_id, p_user_email)
        RETURNING id INTO v_progress_id;
    END IF;
    
    RETURN v_progress_id;
END;
$$ LANGUAGE plpgsql;

-- Function to mark lesson as complete
CREATE OR REPLACE FUNCTION mark_lesson_complete(
    p_course_progress_id UUID,
    p_lesson_id UUID,
    p_time_spent INTEGER DEFAULT 0
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Insert or update completion
    INSERT INTO lesson_completions (course_progress_id, lesson_id, time_spent_minutes)
    VALUES (p_course_progress_id, p_lesson_id, p_time_spent)
    ON CONFLICT (course_progress_id, lesson_id) 
    DO UPDATE SET 
        completed_at = CURRENT_TIMESTAMP,
        time_spent_minutes = lesson_completions.time_spent_minutes + p_time_spent;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VERIFICATION
-- ============================================

DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('course_progress', 'lesson_completions', 'quiz_submissions');

    RAISE NOTICE '===========================================';
    RAISE NOTICE 'PROGRESS TRACKING MIGRATION COMPLETE!';
    RAISE NOTICE '===========================================';
    RAISE NOTICE 'Tables created: %', table_count;
    RAISE NOTICE '===========================================';
    RAISE NOTICE 'Features enabled:';
    RAISE NOTICE '- Course enrollment tracking';
    RAISE NOTICE '- Lesson completion tracking';
    RAISE NOTICE '- Progress percentage calculation';
    RAISE NOTICE '- Quiz submission tracking';
    RAISE NOTICE '- Automatic progress updates';
    RAISE NOTICE '===========================================';
END $$;
