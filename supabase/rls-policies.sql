-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE scholars ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ POLICIES (for published content)
-- ============================================

-- Scholars: Public can read all
CREATE POLICY "Public can view scholars"
  ON scholars FOR SELECT
  TO anon, authenticated
  USING (true);

-- Categories: Public can read all
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Questions: Public can read only published
CREATE POLICY "Public can view published questions"
  ON questions FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Articles: Public can read only published
CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  TO anon, authenticated
  USING (published_at IS NOT NULL);

-- Books: Public can read all
CREATE POLICY "Public can view books"
  ON books FOR SELECT
  TO anon, authenticated
  USING (true);

-- Media: Public can read all
CREATE POLICY "Public can view media"
  ON media FOR SELECT
  TO anon, authenticated
  USING (true);

-- Stats: Public can read
CREATE POLICY "Public can view stats"
  ON stats FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================
-- USER SUBMISSIONS POLICIES
-- ============================================

-- User Questions: Anyone can insert
CREATE POLICY "Anyone can submit questions"
  ON user_questions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Feedback: Anyone can insert
CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ============================================
-- ADMIN POLICIES (service_role bypass RLS)
-- ============================================
-- Note: Admin operations should use service_role key
-- which bypasses RLS automatically

-- ============================================
-- VIEW INCREMENT POLICIES
-- ============================================

-- Allow public to increment view counts
CREATE POLICY "Anyone can update view counts on questions"
  ON questions FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can update view counts on articles"
  ON articles FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can update view counts on media"
  ON media FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can update download counts on books"
  ON books FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- FUNCTIONS FOR VIEW/DOWNLOAD TRACKING
-- ============================================

-- Function to safely increment views
CREATE OR REPLACE FUNCTION increment_views(table_name TEXT, row_id UUID)
RETURNS VOID AS $$
BEGIN
  EXECUTE format('UPDATE %I SET views = views + 1 WHERE id = $1', table_name)
  USING row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to safely increment downloads
CREATE OR REPLACE FUNCTION increment_downloads(row_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE books SET downloads = downloads + 1 WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

