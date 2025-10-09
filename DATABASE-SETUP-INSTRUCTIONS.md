# Database Setup Instructions for Enhanced Course Management

This guide will help you apply the enhanced database schema and sample content to your Supabase database.

## 🎯 Overview

You'll be running two SQL files:

1. `supabase/enhanced-courses-schema.sql` - Creates new tables and enhances existing ones
2. `supabase/sample-course-content.sql` - Populates courses with sample modules and lessons

## 📋 Prerequisites

- Access to your Supabase dashboard
- Admin access to the SQL Editor
- Existing courses in your database (Spoken Arabic for Beginners, Complete Quran Recitation Course)

## 🚀 Step-by-Step Instructions

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project: **islamic-sources**
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query** button

### Step 2: Apply Enhanced Schema

1. Open the file: `supabase/enhanced-courses-schema.sql`
2. Copy the entire contents of the file
3. Paste into the Supabase SQL Editor
4. Click **Run** button (or press Ctrl/Cmd + Enter)
5. Wait for the query to complete (should take 10-15 seconds)
6. You should see: **Success. No rows returned**

**What this does:**

- ✅ Adds rich content fields to existing `course_lessons` table
- ✅ Creates `lesson_resources` table for PDFs, images, videos, links
- ✅ Creates `lesson_exercises` table for interactive exercises
- ✅ Creates `lesson_quizzes` table for assessments
- ✅ Creates `quiz_questions` table for quiz questions
- ✅ Creates `course_assignments` table for projects
- ✅ Creates `course_announcements` table for updates
- ✅ Creates `course_discussions` table for forums
- ✅ Creates `discussion_posts` table for forum posts
- ✅ Creates `course_certificates` table for certificates
- ✅ Sets up proper indexes, triggers, and RLS policies

### Step 3: Load Sample Course Content

1. Click **New Query** in the SQL Editor
2. Open the file: `supabase/sample-course-content.sql`
3. Copy the entire contents of the file
4. Paste into the Supabase SQL Editor
5. Click **Run** button (or press Ctrl/Cmd + Enter)
6. Wait for the query to complete (should take 15-20 seconds)
7. You should see success messages in the output

**What this does:**

- ✅ Creates 4 modules for "Spoken Arabic for Beginners"
- ✅ Creates 8 detailed lessons with rich content
- ✅ Adds study materials (HTML formatted content)
- ✅ Adds practice materials (exercises and scenarios)
- ✅ Adds 10 sample resources (PDFs, videos, worksheets)
- ✅ Adds 3 sample interactive exercises
- ✅ Updates course duration based on lesson lengths
- ✅ Creates starter content for "Complete Quran Recitation Course"

### Step 4: Verify Database Changes

Run these queries to verify the setup:

```sql
-- Check if new tables were created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
    'lesson_resources',
    'lesson_exercises',
    'lesson_quizzes',
    'quiz_questions',
    'course_assignments',
    'course_announcements',
    'course_discussions',
    'discussion_posts',
    'course_certificates'
);

-- Check if modules were created
SELECT COUNT(*) as module_count, course_id
FROM course_modules
GROUP BY course_id;

-- Check if lessons were created
SELECT COUNT(*) as lesson_count, m.course_id
FROM course_lessons cl
JOIN course_modules m ON cl.module_id = m.id
GROUP BY m.course_id;

-- Check if resources were created
SELECT COUNT(*) as resource_count
FROM lesson_resources;

-- Check if exercises were created
SELECT COUNT(*) as exercise_count
FROM lesson_exercises;
```

Expected results:

- ✅ 9 new tables created
- ✅ 7 modules total (4 for Arabic course, 3 for Quran course)
- ✅ 8+ lessons created
- ✅ 10+ resources created
- ✅ 3+ exercises created

### Step 5: Update API to Fetch Enhanced Content

The API has already been prepared to fetch the enhanced content. Once the database changes are applied, the course detail pages will automatically display:

- ✅ Complete course syllabus with modules
- ✅ Rich study materials with formatted content
- ✅ Interactive practice exercises
- ✅ Downloadable resources (PDFs, videos, etc.)
- ✅ Learning objectives and prerequisites

## 🎉 What You'll See After Setup

### Course Management Dashboard

- Enhanced course cards with all information
- Proper duration calculations
- Module and lesson counts

### Course Detail Page

- Collapsible module structure
- Lesson cards with video/text indicators
- Study materials with rich formatting
- Practice exercises with answers
- Downloadable resources
- Progress tracking (ready for implementation)

### Sample Content for "Spoken Arabic for Beginners"

**Module 1: Basic Greetings and Introductions**

- Lesson 1: Essential Greetings (15 min) ✨ Preview
- Lesson 2: Introducing Yourself (20 min)

**Module 2: Daily Conversations**

- Lesson 3: Shopping Conversations (25 min)
- Lesson 4: Asking for Directions (20 min)

**Module 3: Family and Relationships**

- Lesson 5: Family Members (18 min)
- Lesson 6: Describing People (22 min)

**Module 4: Cultural Context and Etiquette**

- Lesson 7: Arabic Cultural Etiquette (30 min)
- Lesson 8: Business and Professional Arabic (25 min)

**Total Duration: 175 minutes (2 hours 55 minutes)**

## 🔧 Troubleshooting

### Issue: "Table already exists" error

**Solution:** This is fine - it means the table was created in a previous run. The script uses `CREATE TABLE IF NOT EXISTS` so it won't fail.

### Issue: "Relation does not exist" error

**Solution:** Make sure you ran `enhanced-courses-schema.sql` BEFORE `sample-course-content.sql`.

### Issue: "Course not found" error

**Solution:** The sample content script looks for courses by slug. Make sure these courses exist:

- `spoken-arabic-for-beginners`
- `complete-quran-recitation-course`

### Issue: API returns 500 error

**Solution:** Check the browser console and terminal logs. The most common issue is that the tables don't exist yet or RLS policies are blocking access.

## 📚 Additional Resources

- **Enhanced Schema File:** `supabase/enhanced-courses-schema.sql`
- **Sample Content File:** `supabase/sample-course-content.sql`
- **Course Detail Page:** `app/dashboard/courses/[slug]/page.tsx`
- **API Route:** `app/api/courses/route.ts`

## 🎊 Next Steps After Setup

1. **Test the Course Detail Page**

   - Navigate to: http://localhost:3000/dashboard/courses/spoken-arabic-for-beginners
   - You should see the full course syllabus with all modules and lessons

2. **Explore the Content**

   - Click on modules to expand/collapse them
   - View study materials with rich formatting
   - Read practice exercises and scenarios
   - Check out downloadable resources

3. **Add More Content**

   - Use the sample content as a template
   - Create more modules and lessons
   - Add your own study materials and resources

4. **Customize the Experience**
   - Modify the course detail page UI
   - Add progress tracking functionality
   - Implement quiz submission and grading
   - Create certificate generation

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console for error messages
2. Check the terminal/server logs
3. Verify database tables were created correctly
4. Check RLS policies are set up properly

---

**Ready to proceed?** Follow the steps above in order, and you'll have a fully functional course management system with rich content!
