-- ============================================
-- STORAGE BUCKETS CONFIGURATION
-- ============================================

-- Note: Run these commands in Supabase Dashboard > Storage
-- Or use Supabase CLI: supabase storage create

-- ============================================
-- 1. BOOKS BUCKET
-- ============================================
-- For PDF book files
-- Bucket name: books
-- Public: true
-- File size limit: 50MB
-- Allowed MIME types: application/pdf

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'books',
  'books',
  true,
  52428800, -- 50MB
  ARRAY['application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Storage policy for books bucket
CREATE POLICY "Public can read books"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'books');

CREATE POLICY "Authenticated users can upload books"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'books');

CREATE POLICY "Authenticated users can update books"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'books');

CREATE POLICY "Authenticated users can delete books"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'books');

-- ============================================
-- 2. MEDIA-AUDIO BUCKET
-- ============================================
-- For audio files (lectures, recitations)
-- Bucket name: media-audio
-- Public: true
-- File size limit: 100MB
-- Allowed MIME types: audio/*

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-audio',
  'media-audio',
  true,
  104857600, -- 100MB
  ARRAY['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg']
) ON CONFLICT (id) DO NOTHING;

-- Storage policy for media-audio bucket
CREATE POLICY "Public can read audio"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'media-audio');

CREATE POLICY "Authenticated users can upload audio"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media-audio');

CREATE POLICY "Authenticated users can update audio"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media-audio');

CREATE POLICY "Authenticated users can delete audio"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media-audio');

-- ============================================
-- 3. MEDIA-VIDEO BUCKET
-- ============================================
-- For video files
-- Bucket name: media-video
-- Public: true
-- File size limit: 500MB
-- Allowed MIME types: video/*

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-video',
  'media-video',
  true,
  524288000, -- 500MB
  ARRAY['video/mp4', 'video/webm', 'video/ogg']
) ON CONFLICT (id) DO NOTHING;

-- Storage policy for media-video bucket
CREATE POLICY "Public can read video"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'media-video');

CREATE POLICY "Authenticated users can upload video"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media-video');

CREATE POLICY "Authenticated users can update video"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media-video');

CREATE POLICY "Authenticated users can delete video"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media-video');

-- ============================================
-- 4. MEDIA-IMAGES BUCKET
-- ============================================
-- For image files
-- Bucket name: media-images
-- Public: true
-- File size limit: 10MB
-- Allowed MIME types: image/*

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-images',
  'media-images',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- Storage policy for media-images bucket
CREATE POLICY "Public can read images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'media-images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media-images');

CREATE POLICY "Authenticated users can update images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media-images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media-images');

-- ============================================
-- 5. SCHOLAR-IMAGES BUCKET
-- ============================================
-- For scholar profile pictures
-- Bucket name: scholar-images
-- Public: true
-- File size limit: 5MB
-- Allowed MIME types: image/*

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'scholar-images',
  'scholar-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Storage policy for scholar-images bucket
CREATE POLICY "Public can read scholar images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'scholar-images');

CREATE POLICY "Authenticated users can upload scholar images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'scholar-images');

CREATE POLICY "Authenticated users can update scholar images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'scholar-images');

CREATE POLICY "Authenticated users can delete scholar images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'scholar-images');

-- ============================================
-- 6. ARTICLE-IMAGES BUCKET
-- ============================================
-- For article cover images and inline images
-- Bucket name: article-images
-- Public: true
-- File size limit: 5MB
-- Allowed MIME types: image/*

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'article-images',
  'article-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Storage policy for article-images bucket
CREATE POLICY "Public can read article images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can update article images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can delete article images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'article-images');

