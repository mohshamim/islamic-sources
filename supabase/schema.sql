-- ============================================
-- ISLAMIC SOURCES DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. SCHOLARS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS scholars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX idx_scholars_slug ON scholars(slug);
CREATE INDEX idx_scholars_name ON scholars(name);

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX idx_categories_slug ON categories(slug);

-- ============================================
-- 3. QUESTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  scholar_id UUID REFERENCES scholars(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  views INTEGER DEFAULT 0,
  slug VARCHAR(500) UNIQUE NOT NULL,
  summary TEXT,
  answer TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_questions_slug ON questions(slug);
CREATE INDEX idx_questions_category ON questions(category_id);
CREATE INDEX idx_questions_scholar ON questions(scholar_id);
CREATE INDEX idx_questions_status ON questions(status);
CREATE INDEX idx_questions_language ON questions(language);
CREATE INDEX idx_questions_views ON questions(views DESC);
CREATE INDEX idx_questions_published_at ON questions(published_at DESC);

-- ============================================
-- 4. ARTICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  scholar_id UUID REFERENCES scholars(id) ON DELETE SET NULL,
  read_time VARCHAR(50) NOT NULL,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  language VARCHAR(10) DEFAULT 'en',
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_scholar ON articles(scholar_id);
CREATE INDEX idx_articles_featured ON articles(featured);
CREATE INDEX idx_articles_language ON articles(language);
CREATE INDEX idx_articles_views ON articles(views DESC);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);

-- ============================================
-- 5. BOOKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  file_url TEXT NOT NULL,
  file_size VARCHAR(50) NOT NULL,
  cover_image TEXT,
  downloads INTEGER DEFAULT 0,
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_books_slug ON books(slug);
CREATE INDEX idx_books_category ON books(category_id);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_language ON books(language);
CREATE INDEX idx_books_downloads ON books(downloads DESC);

-- ============================================
-- 6. MEDIA TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('pdf', 'audio', 'video', 'image')),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  file_url TEXT NOT NULL,
  file_size VARCHAR(50) NOT NULL,
  thumbnail TEXT,
  duration VARCHAR(20),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_media_type ON media(type);
CREATE INDEX idx_media_category ON media(category_id);
CREATE INDEX idx_media_views ON media(views DESC);

-- ============================================
-- 7. USER QUESTIONS (Submissions)
-- ============================================
CREATE TABLE IF NOT EXISTS user_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  question TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'converted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_user_questions_status ON user_questions(status);
CREATE INDEX idx_user_questions_created_at ON user_questions(created_at DESC);

-- ============================================
-- 8. FEEDBACK TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);

-- ============================================
-- 9. STATS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_articles INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  total_books INTEGER DEFAULT 0,
  total_media INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial stats row
INSERT INTO stats (id, total_articles, total_questions, total_books, total_media, total_views, total_downloads)
VALUES (uuid_generate_v4(), 0, 0, 0, 0, 0, 0)
ON CONFLICT DO NOTHING;

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_scholars_updated_at BEFORE UPDATE ON scholars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTIONS FOR AUTO-UPDATE STATS
-- ============================================

-- Function to update stats after insert
CREATE OR REPLACE FUNCTION update_stats_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'articles' THEN
    UPDATE stats SET total_articles = total_articles + 1;
  ELSIF TG_TABLE_NAME = 'questions' THEN
    UPDATE stats SET total_questions = total_questions + 1;
  ELSIF TG_TABLE_NAME = 'books' THEN
    UPDATE stats SET total_books = total_books + 1;
  ELSIF TG_TABLE_NAME = 'media' THEN
    UPDATE stats SET total_media = total_media + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update stats after delete
CREATE OR REPLACE FUNCTION update_stats_on_delete()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'articles' THEN
    UPDATE stats SET total_articles = GREATEST(0, total_articles - 1);
  ELSIF TG_TABLE_NAME = 'questions' THEN
    UPDATE stats SET total_questions = GREATEST(0, total_questions - 1);
  ELSIF TG_TABLE_NAME = 'books' THEN
    UPDATE stats SET total_books = GREATEST(0, total_books - 1);
  ELSIF TG_TABLE_NAME = 'media' THEN
    UPDATE stats SET total_media = GREATEST(0, total_media - 1);
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Apply stats triggers
CREATE TRIGGER trigger_update_stats_on_article_insert AFTER INSERT ON articles
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_insert();
CREATE TRIGGER trigger_update_stats_on_article_delete AFTER DELETE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_delete();

CREATE TRIGGER trigger_update_stats_on_question_insert AFTER INSERT ON questions
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_insert();
CREATE TRIGGER trigger_update_stats_on_question_delete AFTER DELETE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_delete();

CREATE TRIGGER trigger_update_stats_on_book_insert AFTER INSERT ON books
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_insert();
CREATE TRIGGER trigger_update_stats_on_book_delete AFTER DELETE ON books
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_delete();

CREATE TRIGGER trigger_update_stats_on_media_insert AFTER INSERT ON media
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_insert();
CREATE TRIGGER trigger_update_stats_on_media_delete AFTER DELETE ON media
  FOR EACH ROW EXECUTE FUNCTION update_stats_on_delete();

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE scholars IS 'Islamic scholars who author content';
COMMENT ON TABLE categories IS 'Content categories (Fiqh, Aqeedah, etc.)';
COMMENT ON TABLE questions IS 'Q&A content with answers from scholars';
COMMENT ON TABLE articles IS 'Islamic articles and essays';
COMMENT ON TABLE books IS 'Downloadable Islamic books';
COMMENT ON TABLE media IS 'Media files (audio, video, images, PDFs)';
COMMENT ON TABLE user_questions IS 'Questions submitted by users';
COMMENT ON TABLE feedback IS 'User feedback submissions';
COMMENT ON TABLE stats IS 'Platform statistics and metrics';

