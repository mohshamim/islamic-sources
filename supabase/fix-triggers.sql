-- ============================================
-- FIX: Update triggers to work with RLS
-- ============================================

-- Drop existing triggers
DROP TRIGGER IF EXISTS trigger_update_stats_on_article_insert ON articles;
DROP TRIGGER IF EXISTS trigger_update_stats_on_article_delete ON articles;
DROP TRIGGER IF EXISTS trigger_update_stats_on_question_insert ON questions;
DROP TRIGGER IF EXISTS trigger_update_stats_on_question_delete ON questions;
DROP TRIGGER IF EXISTS trigger_update_stats_on_book_insert ON books;
DROP TRIGGER IF EXISTS trigger_update_stats_on_book_delete ON books;
DROP TRIGGER IF EXISTS trigger_update_stats_on_media_insert ON media;
DROP TRIGGER IF EXISTS trigger_update_stats_on_media_delete ON media;

-- Drop old functions
DROP FUNCTION IF EXISTS update_stats_on_insert();
DROP FUNCTION IF EXISTS update_stats_on_delete();

-- ============================================
-- NEW FIXED FUNCTIONS (with WHERE clause)
-- ============================================

-- Function to update stats after insert (FIXED)
CREATE OR REPLACE FUNCTION update_stats_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'articles' THEN
    UPDATE stats SET total_articles = total_articles + 1 WHERE id = (SELECT id FROM stats LIMIT 1);
  ELSIF TG_TABLE_NAME = 'questions' THEN
    UPDATE stats SET total_questions = total_questions + 1 WHERE id = (SELECT id FROM stats LIMIT 1);
  ELSIF TG_TABLE_NAME = 'books' THEN
    UPDATE stats SET total_books = total_books + 1 WHERE id = (SELECT id FROM stats LIMIT 1);
  ELSIF TG_TABLE_NAME = 'media' THEN
    UPDATE stats SET total_media = total_media + 1 WHERE id = (SELECT id FROM stats LIMIT 1);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update stats after delete (FIXED)
CREATE OR REPLACE FUNCTION update_stats_on_delete()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'articles' THEN
    UPDATE stats SET total_articles = GREATEST(0, total_articles - 1) WHERE id = (SELECT id FROM stats LIMIT 1);
  ELSIF TG_TABLE_NAME = 'questions' THEN
    UPDATE stats SET total_questions = GREATEST(0, total_questions - 1) WHERE id = (SELECT id FROM stats LIMIT 1);
  ELSIF TG_TABLE_NAME = 'books' THEN
    UPDATE stats SET total_books = GREATEST(0, total_books - 1) WHERE id = (SELECT id FROM stats LIMIT 1);
  ELSIF TG_TABLE_NAME = 'media' THEN
    UPDATE stats SET total_media = GREATEST(0, total_media - 1) WHERE id = (SELECT id FROM stats LIMIT 1);
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-apply stats triggers
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

