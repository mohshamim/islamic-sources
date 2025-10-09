-- ============================================
-- SEED DATA FOR INITIAL SETUP
-- ============================================

-- ============================================
-- 1. SEED CATEGORIES
-- ============================================

INSERT INTO categories (name, slug, description, icon) VALUES
('Fiqh', 'fiqh', 'Islamic jurisprudence and legal rulings', 'Scale'),
('Aqeedah', 'aqeedah', 'Islamic creed and beliefs', 'Star'),
('Hadith', 'hadith', 'Prophetic traditions and narrations', 'Book'),
('Tafsir', 'tafsir', 'Quranic exegesis and interpretation', 'BookOpen'),
('Seerah', 'seerah', 'Biography of Prophet Muhammad (PBUH)', 'User'),
('General', 'general', 'General Islamic topics', 'Globe'),
('Prayer', 'prayer', 'Salah and worship', 'Heart'),
('Islamic Finance', 'islamic-finance', 'Halal finance and economics', 'DollarSign'),
('Women in Islam', 'women-in-islam', 'Islamic rulings for women', 'Users'),
('Islamic Rulings', 'islamic-rulings', 'Various Islamic rulings', 'Gavel'),
('Islamic Calendar', 'islamic-calendar', 'Islamic dates and occasions', 'Calendar'),
('Fasting', 'fasting', 'Ramadan and voluntary fasting', 'Moon')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 2. SEED SCHOLARS
-- ============================================

INSERT INTO scholars (name, slug, title, specialty, bio, image_url) VALUES
(
  'Sheikh Abdul Aziz bin Baz',
  'sheikh-abdul-aziz-bin-baz',
  'Grand Mufti of Saudi Arabia',
  'Fiqh, Aqeedah, Hadith',
  'Former Grand Mufti of Saudi Arabia and a prominent Islamic scholar known for his vast knowledge in various Islamic sciences.'
,
  NULL
),
(
  'Sheikh Muhammad Salih al-Munajjid',
  'sheikh-muhammad-salih-al-munajjid',
  'Islamic Scholar and Educator',
  'Fiqh, Islamic Rulings',
  'Founder of Islam Q&A website and a renowned scholar providing answers to contemporary Islamic questions.',
  NULL
),
(
  'Sheikh Muhammad ibn al-Uthaymeen',
  'sheikh-muhammad-ibn-al-uthaymeen',
  'Prominent Salafi Scholar',
  'Fiqh, Aqeedah, Tafsir',
  'One of the most prominent Salafi scholars of the 20th century, known for his clear explanations and extensive knowledge.',
  NULL
),
(
  'Sheikh Muhammad Nasiruddin al-Albani',
  'sheikh-muhammad-nasiruddin-al-albani',
  'Hadith Scholar',
  'Hadith, Fiqh, Aqeedah',
  'Renowned hadith scholar known for his work in authenticating hadiths and reviving the study of the Prophetic traditions.',
  NULL
),
(
  'Sheikh Badi uddin Shah Rashidi',
  'sheikh-badi-uddin-shah-rashidi',
  'Indian Subcontinent Scholar',
  'Fiqh, Aqeedah, Hadith',
  'Prominent scholar from the Indian subcontinent adhering to the methodology of Ahlus-Sunnah.',
  NULL
),
(
  'Sheikh Zubair Ali Zai',
  'sheikh-zubair-ali-zai',
  'Pakistani Scholar',
  'Hadith, Fiqh',
  'Well-known Pakistani scholar and researcher specializing in Hadith sciences.',
  NULL
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 3. INITIALIZE STATS
-- ============================================

-- Update stats to reflect seed data
UPDATE stats SET
  total_articles = (SELECT COUNT(*) FROM articles),
  total_questions = (SELECT COUNT(*) FROM questions),
  total_books = (SELECT COUNT(*) FROM books),
  total_media = (SELECT COUNT(*) FROM media),
  updated_at = CURRENT_TIMESTAMP;

-- ============================================
-- 4. SAMPLE QUESTION (Optional - for testing)
-- ============================================

-- Get a category ID for the sample
DO $$
DECLARE
  prayer_category_id UUID;
  baz_scholar_id UUID;
BEGIN
  SELECT id INTO prayer_category_id FROM categories WHERE slug = 'prayer' LIMIT 1;
  SELECT id INTO baz_scholar_id FROM scholars WHERE slug = 'sheikh-abdul-aziz-bin-baz' LIMIT 1;
  
  IF prayer_category_id IS NOT NULL AND baz_scholar_id IS NOT NULL THEN
    INSERT INTO questions (
      question,
      category_id,
      scholar_id,
      status,
      views,
      slug,
      summary,
      answer,
      tags,
      language,
      published_at
    ) VALUES (
      'Is it permissible to pray with shoes on?',
      prayer_category_id,
      baz_scholar_id,
      'published',
      456,
      'is-it-permissible-to-pray-with-shoes-on',
      'Yes, it is permissible to pray with shoes on provided they are clean and the prayer area is clean. However, it is better to pray barefoot or in clean socks as was the practice of the Prophet (peace be upon him).',
      '<p>Yes, it is permissible to pray with shoes on provided they are clean and the prayer area is clean. However, it is better to pray barefoot or in clean socks as was the practice of the Prophet (peace be upon him).</p><p>The evidence for this comes from authentic hadiths where the Prophet (peace be upon him) prayed with his shoes on certain occasions.</p>',
      ARRAY['prayer', 'shoes', 'fiqh'],
      'en',
      CURRENT_TIMESTAMP
    )
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END $$;

-- ============================================
-- 5. SAMPLE ARTICLE (Optional - for testing)
-- ============================================

DO $$
DECLARE
  fiqh_category_id UUID;
  munajjid_scholar_id UUID;
BEGIN
  SELECT id INTO fiqh_category_id FROM categories WHERE slug = 'fiqh' LIMIT 1;
  SELECT id INTO munajjid_scholar_id FROM scholars WHERE slug = 'sheikh-muhammad-salih-al-munajjid' LIMIT 1;
  
  IF fiqh_category_id IS NOT NULL AND munajjid_scholar_id IS NOT NULL THEN
    INSERT INTO articles (
      title,
      slug,
      content,
      excerpt,
      category_id,
      scholar_id,
      read_time,
      views,
      featured,
      language,
      published_at
    ) VALUES (
      'The Importance of Following the Sunnah',
      'the-importance-of-following-the-sunnah',
      '<h2>Introduction</h2><p>The Sunnah of the Prophet (peace be upon him) is the second source of Islamic legislation after the Quran. Following the Sunnah is an essential part of being a Muslim and is a demonstration of love for the Prophet (peace be upon him).</p><h2>The Command to Follow the Sunnah</h2><p>Allah says in the Quran: "And obey Allah and the Messenger that you may obtain mercy." (Quran 3:132)</p><p>This verse clearly indicates the obligation of following the Messenger of Allah (peace be upon him).</p>',
      'Understanding the importance of following the Sunnah of Prophet Muhammad (peace be upon him) in our daily lives.',
      fiqh_category_id,
      munajjid_scholar_id,
      '5 min read',
      1234,
      true,
      'en',
      CURRENT_TIMESTAMP
    )
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END $$;

