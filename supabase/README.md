# Supabase Database Setup Guide

This guide will help you set up the Supabase database for the Islamic Sources project.

## Prerequisites

- Supabase account and project created
- Supabase credentials (URL and Keys)

## Setup Steps

### 1. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ioihqcimivmwnasckkig.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the following files in order:

#### Step 2.1: Create Tables
```sql
-- Copy and paste contents of: supabase/schema.sql
```

#### Step 2.2: Set up RLS Policies
```sql
-- Copy and paste contents of: supabase/rls-policies.sql
```

#### Step 2.3: Configure Storage
```sql
-- Copy and paste contents of: supabase/storage.sql
```

#### Step 2.4: Seed Initial Data
```sql
-- Copy and paste contents of: supabase/seed.sql
```

### 3. Create Storage Buckets

Go to **Storage** section in Supabase Dashboard and verify these buckets exist:

1. **books** - For PDF book files (50MB limit)
2. **media-audio** - For audio files (100MB limit)
3. **media-video** - For video files (500MB limit)
4. **media-images** - For general images (10MB limit)
5. **scholar-images** - For scholar profile pictures (5MB limit)
6. **article-images** - For article cover images (5MB limit)

Make sure all buckets are set to **Public**.

### 4. Enable Authentication

1. Go to **Authentication** > **Providers**
2. Enable **Email** provider
3. Configure email templates (optional)
4. Add admin users via **Authentication** > **Users**

### 5. Verify Setup

Run this query in SQL Editor to verify tables:

```sql
SELECT 
  table_name 
FROM 
  information_schema.tables 
WHERE 
  table_schema = 'public'
ORDER BY 
  table_name;
```

You should see all 9 tables:
- scholars
- categories
- questions
- articles
- books
- media
- user_questions
- feedback
- stats

## Database Schema Overview

### Tables

1. **scholars** - Islamic scholars who author content
2. **categories** - Content categories (Fiqh, Aqeedah, etc.)
3. **questions** - Q&A content with answers
4. **articles** - Islamic articles and essays
5. **books** - Downloadable Islamic books
6. **media** - Media files (audio, video, images, PDFs)
7. **user_questions** - Questions submitted by users
8. **feedback** - User feedback submissions
9. **stats** - Platform statistics

### Relationships

- scholars → questions (one-to-many)
- scholars → articles (one-to-many)
- categories → questions (one-to-many)
- categories → articles (one-to-many)
- categories → books (one-to-many)
- categories → media (one-to-many)

### Security

- **Row Level Security (RLS)** is enabled on all tables
- Public users can read published content
- Authenticated users can submit questions and feedback
- Admin operations use service_role key (bypasses RLS)

## Automatic Features

### Auto-updating Fields
- `updated_at` timestamp auto-updates on record modification
- Stats table auto-updates when content is added/deleted

### Tracking Functions
- `increment_views(table_name, row_id)` - Safely increment view counts
- `increment_downloads(row_id)` - Safely increment download counts

## Next Steps

After setup is complete, you can:
1. Start building the admin dashboard
2. Implement authentication
3. Create CRUD operations for content management

## Troubleshooting

### Common Issues

**Issue**: RLS policies blocking reads
**Solution**: Ensure content is marked as 'published' and has published_at date

**Issue**: Storage upload fails
**Solution**: Check bucket permissions and file size limits

**Issue**: Stats not updating
**Solution**: Verify triggers are created properly

### Getting Help

- Supabase Documentation: https://supabase.com/docs
- Project Issues: Create an issue in the repository

## Backup

To backup your database:
1. Go to **Database** > **Backups** in Supabase Dashboard
2. Enable daily backups
3. Download manual backups when needed

## Migration

For future schema changes, create migration files:
```
supabase/migrations/YYYYMMDD_description.sql
```

---

**Last Updated**: 2025-01-05
**Version**: 1.0.0

