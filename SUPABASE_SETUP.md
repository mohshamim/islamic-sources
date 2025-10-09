# 🚀 Supabase Setup Instructions

## ✅ PHASE 1: SUPABASE SETUP & DATABASE SCHEMA - COMPLETED!

All database files have been created. Follow these steps to set up your Supabase database.

---

## 📋 Files Created

1. ✅ `lib/supabase/client.ts` - Supabase client configuration
2. ✅ `lib/supabase/types.ts` - TypeScript types for database
3. ✅ `supabase/schema.sql` - Complete database schema
4. ✅ `supabase/rls-policies.sql` - Row Level Security policies
5. ✅ `supabase/storage.sql` - Storage buckets configuration
6. ✅ `supabase/seed.sql` - Initial seed data
7. ✅ `supabase/README.md` - Detailed documentation
8. ✅ `.env.example` - Environment variables template

---

## 🔧 SETUP INSTRUCTIONS

### Step 1: Configure Environment Variables

1. Copy your Supabase credentials
2. Create `.env.local` file in the project root
3. Add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ioihqcimivmwnasckkig.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvaWhxY2ltaXZtd25hc2Nra2lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NDQ5ODYsImV4cCI6MjA3NTIyMDk4Nn0.TC1DaADsFH3XnjJZ_7x4CqW8U0Mmprsp7IHJhtwl5kQ
```

### Step 2: Run SQL Scripts in Supabase Dashboard

1. Open your Supabase project: https://app.supabase.com
2. Go to **SQL Editor**
3. Run these SQL files **in order**:

#### 2.1: Create Database Schema

- Open `supabase/schema.sql`
- Copy all contents
- Paste in SQL Editor
- Click **Run**
- ✅ Creates all 9 tables with indexes and triggers

#### 2.2: Set Up RLS Policies

- Open `supabase/rls-policies.sql`
- Copy all contents
- Paste in SQL Editor
- Click **Run**
- ✅ Sets up security policies for all tables

#### 2.3: Configure Storage Buckets

- Open `supabase/storage.sql`
- Copy all contents
- Paste in SQL Editor
- Click **Run**
- ✅ Creates 6 storage buckets with policies

#### 2.4: Seed Initial Data

- Open `supabase/seed.sql`
- Copy all contents
- Paste in SQL Editor
- Click **Run**
- ✅ Adds initial categories and scholars

### Step 3: Verify Storage Buckets

Go to **Storage** in Supabase Dashboard and verify these buckets exist:

- ✅ `books` (50MB limit, PDF files)
- ✅ `media-audio` (100MB limit, Audio files)
- ✅ `media-video` (500MB limit, Video files)
- ✅ `media-images` (10MB limit, Images)
- ✅ `scholar-images` (5MB limit, Profile pictures)
- ✅ `article-images` (5MB limit, Cover images)

All buckets should be set to **Public**.

### Step 4: Verify Database Tables

Run this query in SQL Editor to verify:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see **9 tables**:

1. articles
2. books
3. categories
4. feedback
5. media
6. questions
7. scholars
8. stats
9. user_questions

---

## 📊 Database Overview

### Tables & Relationships

```
scholars ──┬─→ questions
           └─→ articles

categories ─┬─→ questions
            ├─→ articles
            ├─→ books
            └─→ media

user_questions (standalone submissions)
feedback (standalone submissions)
stats (platform metrics)
```

### Key Features

✅ **Auto-updating timestamps** - `updated_at` auto-updates on changes
✅ **Auto-updating stats** - Stats table updates when content is added/deleted
✅ **View tracking** - Functions to safely increment views and downloads
✅ **Full-text search** - Indexes for fast searching
✅ **Slug-based URLs** - All content accessible via slugs

---

## 🔒 Security Features

### Row Level Security (RLS)

- ✅ Public can read **published** content only
- ✅ Anyone can submit questions and feedback
- ✅ Admin operations use service_role key (bypasses RLS)
- ✅ View counts can be incremented by anyone

### Storage Security

- ✅ All buckets are public for reading
- ✅ Only authenticated users can upload/modify files
- ✅ File size limits enforced
- ✅ MIME type restrictions in place

---

## 🧪 Test Your Setup

### Quick Test Query

Run this to check if seed data loaded:

```sql
SELECT COUNT(*) as category_count FROM categories;
SELECT COUNT(*) as scholar_count FROM scholars;
SELECT COUNT(*) as question_count FROM questions;
```

Expected results:

- Categories: 12
- Scholars: 6
- Questions: 1 (sample)

---

## 🎯 Next Steps

Now that database setup is complete, you can proceed with:

### **Option B**: Authentication & Login Page

- Set up Supabase Auth
- Create admin login page
- Implement protected routes
- Role-based access control

### **Option C**: Dashboard Layout & Structure

- Create admin dashboard layout
- Sidebar navigation
- Top bar with user menu
- Dashboard home with stats

### **Option D**: Start Content Management

- Questions CRUD operations
- Articles CRUD operations
- File upload functionality
- Rich text editor integration

---

## 📝 Important Notes

1. **Never commit `.env.local`** - It contains sensitive credentials
2. **Get Service Role Key** - For admin operations, get it from Supabase Dashboard > Settings > API
3. **Enable Authentication** - Go to Authentication > Providers and enable Email auth
4. **Backup Regularly** - Enable automatic backups in Database > Backups

---

## 🐛 Troubleshooting

### Issue: Tables not created

**Solution**: Make sure to run `schema.sql` first

### Issue: RLS blocking reads

**Solution**: Ensure content has `status='published'` or `published_at` is set

### Issue: Storage upload fails

**Solution**: Check bucket exists and file size is within limits

### Issue: Stats not updating

**Solution**: Verify triggers are created in `schema.sql`

---

## ✅ Setup Checklist

- [ ] Environment variables configured in `.env.local`
- [ ] Database schema created (`schema.sql`)
- [ ] RLS policies applied (`rls-policies.sql`)
- [ ] Storage buckets created (`storage.sql`)
- [ ] Seed data loaded (`seed.sql`)
- [ ] All 9 tables exist and verified
- [ ] All 6 storage buckets exist and are public
- [ ] Test queries run successfully

---

## 🎉 Ready to Continue!

Once all setup steps are complete, let me know which phase you'd like to tackle next:

- **Option B**: Authentication & Authorization
- **Option C**: Admin Dashboard Layout
- **Option D**: Content Management (CRUD)

Your database is now ready for the admin dashboard! 🚀

---

**Setup Completed**: [Date]
**Supabase Project**: https://ioihqcimivmwnasckkig.supabase.co
