# 🧪 COURSES SYSTEM - TESTING GUIDE

## STEP 1: RUN SQL SCRIPTS IN SUPABASE

### **Option A: Supabase Dashboard (Recommended)**

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

**Run Script 1: Add Courses to Stats**

```sql
-- Copy and paste from: supabase/add-courses-to-stats.sql
ALTER TABLE stats ADD COLUMN IF NOT EXISTS total_courses INTEGER DEFAULT 0;

UPDATE stats
SET total_courses = (SELECT COUNT(*) FROM courses)
WHERE id = (SELECT id FROM stats LIMIT 1);
```

Click **Run** ✅

**Run Script 2: Create Courses Tables**

```sql
-- Copy and paste entire content from: supabase/courses-schema.sql
-- (This is a long script - creates 6 tables + triggers + policies)
```

Click **Run** ✅

### **Option B: Using Supabase CLI**

```bash
supabase db push
```

---

## STEP 2: VERIFY DATABASE SETUP

### **Check Tables Exist:**

In Supabase Dashboard → **Table Editor**, verify these tables:

- ✅ `courses`
- ✅ `course_modules`
- ✅ `course_lessons`
- ✅ `course_enrollments`
- ✅ `lesson_progress`
- ✅ `course_reviews`
- ✅ `stats` (with new `total_courses` column)

---

## STEP 3: TEST API ENDPOINTS

### **Use Postman, Thunder Client, or curl**

### **Test 1: Create a Course**

**Request:**

```http
POST http://localhost:3000/api/courses
Content-Type: application/json

{
  "title": "Complete Islamic Studies Foundation",
  "description": "A comprehensive course covering the fundamentals of Islamic knowledge, perfect for beginners seeking authentic understanding.",
  "instructorName": "Sheikh Muhammad Al-Hakim",
  "instructorBio": "Scholar in Islamic Jurisprudence with 15 years of teaching experience",
  "category": "Aqeedah",
  "level": "beginner",
  "type": "free",
  "introVideoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "status": "published"
}
```

**Expected Response:**

```json
{
  "id": "uuid-here",
  "title": "Complete Islamic Studies Foundation",
  "slug": "complete-islamic-studies-foundation",
  "thumbnail_url": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "rating": 0,
  "review_count": 0,
  "enrollment_count": 0,
  ...
}
```

✅ **Check:** `thumbnail_url` auto-generated from YouTube video!

---

### **Test 2: List Courses**

**Request:**

```http
GET http://localhost:3000/api/courses?status=published&limit=10&page=1
```

**Expected Response:**

```json
{
  "courses": [
    {
      "id": "...",
      "title": "Complete Islamic Studies Foundation",
      "categories": {
        "id": "...",
        "name": "Aqeedah",
        "slug": "aqeedah"
      },
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

✅ **Check:** Course appears with category joined!

---

### **Test 3: Add Module to Course**

**Request:**

```http
POST http://localhost:3000/api/courses/[COURSE_ID]/modules
Content-Type: application/json

{
  "title": "Module 1: Pillars of Faith",
  "description": "Understanding the six pillars of Iman",
  "estimatedTime": 60
}
```

**Expected Response:**

```json
{
  "id": "module-uuid",
  "course_id": "course-uuid",
  "title": "Module 1: Pillars of Faith",
  "order_index": 0,
  ...
}
```

✅ **Check:** `order_index` is auto-assigned!

---

### **Test 4: Add Lesson to Module**

**Request:**

```http
POST http://localhost:3000/api/courses/[COURSE_ID]/modules/[MODULE_ID]/lessons
Content-Type: application/json

{
  "title": "Introduction to Tawheed",
  "description": "Understanding the oneness of Allah",
  "type": "video",
  "contentUrl": "https://www.youtube.com/watch?v=ABC123",
  "durationMinutes": 15,
  "isPreview": true
}
```

**Expected Response:**

```json
{
  "id": "lesson-uuid",
  "module_id": "module-uuid",
  "title": "Introduction to Tawheed",
  "type": "video",
  "order_index": 0,
  ...
}
```

✅ **Check:** Lesson created and module's `estimated_time` updated!

---

### **Test 5: Enroll in Course**

**Request:**

```http
POST http://localhost:3000/api/courses/[COURSE_ID]/enroll
Content-Type: application/json

{
  "userEmail": "test@example.com",
  "userName": "Test User"
}
```

**Expected Response:**

```json
{
  "id": "enrollment-uuid",
  "course_id": "course-uuid",
  "user_email": "test@example.com",
  "progress_percentage": 0,
  ...
}
```

✅ **Check:** Enrollment created, course `enrollment_count` increased!

---

### **Test 6: Mark Lesson Complete**

**Request:**

```http
POST http://localhost:3000/api/lessons/[LESSON_ID]/complete
Content-Type: application/json

{
  "enrollmentId": "enrollment-uuid",
  "completed": true
}
```

**Expected Response:**

```json
{
  "id": "progress-uuid",
  "enrollment_id": "enrollment-uuid",
  "lesson_id": "lesson-uuid",
  "completed": true,
  ...
}
```

✅ **Check:** Progress created, enrollment `progress_percentage` auto-updated!

**Verify:** Go to Supabase → `course_enrollments` table → check `progress_percentage` changed!

---

### **Test 7: Submit Review**

**Request:**

```http
POST http://localhost:3000/api/courses/[COURSE_ID]/reviews
Content-Type: application/json

{
  "userEmail": "test@example.com",
  "userName": "Test User",
  "rating": 5,
  "comment": "Excellent course! Very clear and comprehensive."
}
```

**Expected Response:**

```json
{
  "id": "review-uuid",
  "course_id": "course-uuid",
  "rating": 5,
  "comment": "Excellent course! Very clear and comprehensive.",
  ...
}
```

✅ **Check:** Review created, course `rating` and `review_count` auto-updated!

**Verify:** GET `/api/courses/[COURSE_ID]` → `rating` should now be 5.0!

---

### **Test 8: Get Course with Modules and Lessons**

**Request:**

```http
GET http://localhost:3000/api/courses/[COURSE_ID]
```

**Expected Response:**

```json
{
  "id": "course-uuid",
  "title": "Complete Islamic Studies Foundation",
  "modules": [
    {
      "id": "module-uuid",
      "title": "Module 1: Pillars of Faith",
      "course_lessons": [
        {
          "id": "lesson-uuid",
          "title": "Introduction to Tawheed",
          "type": "video",
          "content_url": "https://www.youtube.com/watch?v=ABC123",
          ...
        }
      ]
    }
  ],
  ...
}
```

✅ **Check:** Full course structure with nested modules and lessons!

---

## STEP 4: VERIFY AUTO-FEATURES

### **1. YouTube Thumbnail Auto-Generation**

- Create course with `introVideoUrl`
- Check `thumbnail_url` is populated automatically
- URL format: `https://img.youtube.com/vi/[VIDEO_ID]/maxresdefault.jpg`

### **2. Course Rating Auto-Update**

- Submit 3 reviews with ratings 5, 4, 5
- Check course `rating` = 4.67
- Check course `review_count` = 3

### **3. Enrollment Count**

- Enroll 2 users in a course
- Check course `enrollment_count` = 2

### **4. Progress Percentage**

- Create course with 2 modules, 4 lessons total
- Enroll user
- Mark 2 lessons complete
- Check enrollment `progress_percentage` = 50

### **5. Module Estimated Time**

- Add 3 lessons to module (10 min, 15 min, 20 min)
- Check module `estimated_time` = 45 minutes

### **6. Stats Table**

- Create 3 courses
- Check `stats` table → `total_courses` = 3

---

## STEP 5: TEST ERROR CASES

### **1. Duplicate Enrollment**

- Try enrolling same email in same course twice
- Should get: `400 - Already enrolled in this course`

### **2. Duplicate Review**

- Try submitting review from same email twice
- Should get: `400 - You have already reviewed this course`

### **3. Invalid Category**

- Create course with non-existent category
- Should get: `400 - Invalid category`

### **4. Invalid Rating**

- Submit review with rating = 6
- Should get: `400 - Rating must be between 1 and 5`

---

## 📊 TESTING CHECKLIST

- [ ] SQL scripts run successfully
- [ ] All 6 tables created in Supabase
- [ ] ✅ Create course
- [ ] ✅ List courses with pagination
- [ ] ✅ Get single course
- [ ] ✅ Update course
- [ ] ✅ Delete course
- [ ] ✅ Create module
- [ ] ✅ Create lesson
- [ ] ✅ Enroll in course
- [ ] ✅ Mark lesson complete
- [ ] ✅ Submit review
- [ ] ✅ YouTube thumbnail auto-generated
- [ ] ✅ Rating auto-calculated
- [ ] ✅ Progress auto-calculated
- [ ] ✅ Enrollment count auto-updated
- [ ] ✅ Stats table updated

---

## 🎯 AFTER TESTING

Once all tests pass, confirm with:

```
All API tests passed! Ready to move to Phase 3 (Dashboard UI)
```

Then we'll build the beautiful dashboard interface for course management! 🚀
