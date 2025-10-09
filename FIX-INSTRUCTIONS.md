# 🔧 Fix Instructions - Article Creation & Public Display

## ✅ What I Fixed

### 1. **Public Articles Page**

- Changed from mock data to **real Supabase data**
- Now fetches articles from `/api/articles` endpoint
- Added loading states and error handling

### 2. **Trigger Error Fix**

- Created `supabase/fix-triggers.sql` to fix the "UPDATE requires a WHERE clause" error
- The triggers were trying to update stats without WHERE clause (not allowed with RLS)

---

## 🚨 Action Required - Run This SQL in Supabase

### Step 1: Go to Supabase Dashboard

1. Open [https://app.supabase.com](https://app.supabase.com)
2. Select your project: `islamic-sources`
3. Go to **SQL Editor** (left sidebar)

### Step 2: Run the Fix Script

1. Click **"New query"**
2. Copy the entire contents of `supabase/fix-triggers.sql`
3. Paste into the SQL editor
4. Click **"Run"** (or press Ctrl+Enter)

This will:

- Drop the old buggy triggers
- Create new fixed triggers with proper WHERE clauses
- Add `SECURITY DEFINER` to bypass RLS for stats updates

---

## 🧪 After Running the SQL - Test Again

### Test 1: Create an Article in Dashboard

1. Go to `http://localhost:3000/dashboard/articles`
2. Click **"New Article"**
3. Fill in:
   - Title: "Test Article from Dashboard"
   - Excerpt: "Testing creation"
   - Content: "This should work now"
   - Category: General
   - Status: Published
4. Click **"Create Article"**
5. ✅ Should see success message (no 500 error)

### Test 2: View on Public Site

1. Go to `http://localhost:3000/articles`
2. ✅ Should see your newly created article
3. ✅ Should see "The Importance of Following the Sunnah" (from seed data)
4. Click on any article
5. ✅ Should display article details

---

## 📋 What Changed in Code

### Files Modified:

1. **`app/articles/page.tsx`**

   - Now fetches from `/api/articles` instead of mock data
   - Added loading and empty states
   - Shows real articles from Supabase

2. **`supabase/fix-triggers.sql`** (NEW FILE)
   - Fixes the trigger functions to work with RLS
   - Adds WHERE clauses to all UPDATE statements

---

## 🎯 Expected Result After Fix

### Dashboard Articles Management:

- ✅ Can create articles successfully
- ✅ Can edit articles
- ✅ Can delete articles
- ✅ Real-time stats update

### Public Articles Page:

- ✅ Shows real articles from database
- ✅ No more mock/sample data
- ✅ Pagination works correctly
- ✅ Clicking articles shows full content

---

## 🆘 If Still Having Issues

Check server logs for errors:

```bash
# Look for console output in terminal running npm run dev
```

Common issues:

1. **Still seeing mock data** → Hard refresh browser (Ctrl+Shift+R)
2. **500 error on create** → Make sure you ran the SQL fix script
3. **No articles showing** → Check if articles exist in Supabase dashboard

---

## 📝 Notes

- The service role key is working correctly (length: 219 ✓)
- RLS policies are active and working
- Admin client is properly configured
- The issue was **only** the trigger functions needing WHERE clauses
