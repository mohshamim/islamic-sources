-- ============================================
-- COURSES SYSTEM DATABASE SCHEMA
-- ============================================
-- This schema includes:
-- 1. courses - Main course information
-- 2. course_modules - Course modules/sections
-- 3. course_lessons - Individual lessons within modules
-- 4. course_enrollments - User enrollments in courses
-- 5. lesson_progress - Individual lesson completion tracking
-- 6. course_reviews - Course reviews and ratings
-- ============================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  instructor_name VARCHAR(255) NOT NULL,
  instructor_bio TEXT,
  instructor_avatar_url TEXT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  level VARCHAR(20) DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  type VARCHAR(20) DEFAULT 'free' CHECK (type IN ('free', 'paid')),
  price DECIMAL(10, 2), -- Price in USD, null for free courses
  duration_minutes INTEGER DEFAULT 0, -- Total course duration
  thumbnail_url TEXT, -- Auto-generated from YouTube or custom
  intro_video_url TEXT, -- YouTube URL for course intro
  rating DECIMAL(3, 2) DEFAULT 0.0, -- Average rating (0-5)
  review_count INTEGER DEFAULT 0,
  enrollment_count INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for courses
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_type ON courses(type);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_featured ON courses(featured);
CREATE INDEX idx_courses_rating ON courses(rating DESC);
CREATE INDEX idx_courses_published_at ON courses(published_at DESC);

-- ============================================
-- 2. COURSE MODULES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  estimated_time INTEGER DEFAULT 0, -- Minutes
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for course_modules
CREATE INDEX idx_course_modules_course ON course_modules(course_id);
CREATE INDEX idx_course_modules_order ON course_modules(course_id, order_index);

-- ============================================
-- 3. COURSE LESSONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS course_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  type VARCHAR(20) DEFAULT 'video' CHECK (type IN ('video', 'reading', 'quiz', 'exercise', 'assignment')),
  content_url TEXT, -- YouTube URL for videos, or external links
  duration_minutes INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_preview BOOLEAN DEFAULT FALSE, -- Can be viewed without enrollment
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for course_lessons
CREATE INDEX idx_course_lessons_module ON course_lessons(module_id);
CREATE INDEX idx_course_lessons_order ON course_lessons(module_id, order_index);
CREATE INDEX idx_course_lessons_type ON course_lessons(type);

-- ============================================
-- 4. COURSE ENROLLMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_email VARCHAR(255) NOT NULL, -- For now, using email (later: user_id)
  user_name VARCHAR(255),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(course_id, user_email) -- One enrollment per user per course
);

-- Indexes for course_enrollments
CREATE INDEX idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX idx_enrollments_user ON course_enrollments(user_email);
CREATE INDEX idx_enrollments_enrolled_at ON course_enrollments(enrolled_at DESC);

-- ============================================
-- 5. LESSON PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID NOT NULL REFERENCES course_enrollments(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(enrollment_id, lesson_id) -- One progress record per enrollment per lesson
);

-- Indexes for lesson_progress
CREATE INDEX idx_lesson_progress_enrollment ON lesson_progress(enrollment_id);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);
CREATE INDEX idx_lesson_progress_completed ON lesson_progress(completed);

-- ============================================
-- 6. COURSE REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS course_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_id, user_email) -- One review per user per course
);

-- Indexes for course_reviews
CREATE INDEX idx_course_reviews_course ON course_reviews(course_id);
CREATE INDEX idx_course_reviews_rating ON course_reviews(rating DESC);
CREATE INDEX idx_course_reviews_created_at ON course_reviews(created_at DESC);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Apply updated_at triggers
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_modules_updated_at BEFORE UPDATE ON course_modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_lessons_updated_at BEFORE UPDATE ON course_lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_reviews_updated_at BEFORE UPDATE ON course_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TRIGGERS FOR AUTO-UPDATE COURSE STATS
-- ============================================

-- Function to update course rating when review is added/updated/deleted
CREATE OR REPLACE FUNCTION update_course_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE courses
  SET 
    rating = COALESCE((
      SELECT AVG(rating)::DECIMAL(3,2)
      FROM course_reviews
      WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
    ), 0),
    review_count = (
      SELECT COUNT(*)
      FROM course_reviews
      WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
    )
  WHERE id = COALESCE(NEW.course_id, OLD.course_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply review triggers
CREATE TRIGGER trigger_update_course_rating_on_review_insert
  AFTER INSERT ON course_reviews
  FOR EACH ROW EXECUTE FUNCTION update_course_rating();

CREATE TRIGGER trigger_update_course_rating_on_review_update
  AFTER UPDATE ON course_reviews
  FOR EACH ROW EXECUTE FUNCTION update_course_rating();

CREATE TRIGGER trigger_update_course_rating_on_review_delete
  AFTER DELETE ON course_reviews
  FOR EACH ROW EXECUTE FUNCTION update_course_rating();

-- Function to update course enrollment count
CREATE OR REPLACE FUNCTION update_course_enrollment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE courses
    SET enrollment_count = enrollment_count + 1
    WHERE id = NEW.course_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE courses
    SET enrollment_count = GREATEST(0, enrollment_count - 1)
    WHERE id = OLD.course_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply enrollment count triggers
CREATE TRIGGER trigger_update_enrollment_count_on_insert
  AFTER INSERT ON course_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_course_enrollment_count();

CREATE TRIGGER trigger_update_enrollment_count_on_delete
  AFTER DELETE ON course_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_course_enrollment_count();

-- Function to update enrollment progress when lesson is completed
CREATE OR REPLACE FUNCTION update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
  new_progress INTEGER;
  v_course_id UUID;
BEGIN
  -- Get the course_id from enrollment
  SELECT ce.course_id INTO v_course_id
  FROM course_enrollments ce
  WHERE ce.id = NEW.enrollment_id;

  -- Count total lessons in the course
  SELECT COUNT(*) INTO total_lessons
  FROM course_lessons cl
  INNER JOIN course_modules cm ON cl.module_id = cm.id
  WHERE cm.course_id = v_course_id;

  -- Count completed lessons for this enrollment
  SELECT COUNT(*) INTO completed_lessons
  FROM lesson_progress
  WHERE enrollment_id = NEW.enrollment_id AND completed = TRUE;

  -- Calculate progress percentage
  IF total_lessons > 0 THEN
    new_progress := (completed_lessons * 100) / total_lessons;
  ELSE
    new_progress := 0;
  END IF;

  -- Update enrollment progress
  UPDATE course_enrollments
  SET 
    progress_percentage = new_progress,
    completed_at = CASE WHEN new_progress = 100 THEN CURRENT_TIMESTAMP ELSE NULL END,
    last_accessed_at = CURRENT_TIMESTAMP
  WHERE id = NEW.enrollment_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply progress update trigger
CREATE TRIGGER trigger_update_enrollment_progress
  AFTER INSERT OR UPDATE ON lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_enrollment_progress();

-- ============================================
-- TRIGGER TO UPDATE STATS TABLE (courses count)
-- ============================================

-- Function to update stats for courses
CREATE OR REPLACE FUNCTION update_stats_on_course_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE stats SET total_courses = total_courses + 1 WHERE id = (SELECT id FROM stats LIMIT 1);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE stats SET total_courses = GREATEST(0, total_courses - 1) WHERE id = (SELECT id FROM stats LIMIT 1);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Note: We need to add total_courses column to stats table first
-- ALTER TABLE stats ADD COLUMN IF NOT EXISTS total_courses INTEGER DEFAULT 0;

-- Apply course stats triggers
CREATE TRIGGER trigger_update_stats_on_course_insert
  AFTER INSERT ON courses
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_course_change();

CREATE TRIGGER trigger_update_stats_on_course_delete
  AFTER DELETE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_course_change();

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE courses IS 'Main courses with pricing, instructor, and metadata';
COMMENT ON TABLE course_modules IS 'Modules/sections within each course';
COMMENT ON TABLE course_lessons IS 'Individual lessons within modules';
COMMENT ON TABLE course_enrollments IS 'User enrollments and progress tracking';
COMMENT ON TABLE lesson_progress IS 'Per-lesson completion tracking';
COMMENT ON TABLE course_reviews IS 'User reviews and ratings for courses';

-- ============================================
-- RLS POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- Public read access to published courses
CREATE POLICY "Public courses are viewable by everyone"
  ON courses FOR SELECT
  USING (status = 'published' OR status = 'draft');

-- Public read access to modules of published courses
CREATE POLICY "Modules are viewable by everyone"
  ON course_modules FOR SELECT
  USING (true);

-- Public read access to lessons
CREATE POLICY "Lessons are viewable by everyone"
  ON course_lessons FOR SELECT
  USING (true);

-- Public read access to reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON course_reviews FOR SELECT
  USING (true);

-- Enrollments viewable by user (later: add user_id check)
CREATE POLICY "Enrollments are viewable by everyone"
  ON course_enrollments FOR SELECT
  USING (true);

-- Progress viewable by user
CREATE POLICY "Progress is viewable by everyone"
  ON lesson_progress FOR SELECT
  USING (true);

-- Insert policies (will be handled by admin client for now)
CREATE POLICY "Enable insert for service role"
  ON courses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for service role"
  ON courses FOR UPDATE
  USING (true);

CREATE POLICY "Enable delete for service role"
  ON courses FOR DELETE
  USING (true);

-- Similar policies for other tables
CREATE POLICY "Enable all for service role on modules"
  ON course_modules FOR ALL
  USING (true);

CREATE POLICY "Enable all for service role on lessons"
  ON course_lessons FOR ALL
  USING (true);

CREATE POLICY "Enable all for service role on enrollments"
  ON course_enrollments FOR ALL
  USING (true);

CREATE POLICY "Enable all for service role on progress"
  ON lesson_progress FOR ALL
  USING (true);

CREATE POLICY "Enable all for service role on reviews"
  ON course_reviews FOR ALL
  USING (true);

