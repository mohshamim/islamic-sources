# 📚 Course Management System - User Guide

## 🎯 **Quick Start Guide**

### **Accessing Course Management**

1. **View All Courses**

   - Go to: http://localhost:3000/dashboard/courses
   - See all courses in card layout

2. **View Course Details**

   - Click "Start Course" on any course card
   - See complete syllabus with modules and lessons

3. **Manage Course Syllabus**
   - On course detail page, click "Manage Syllabus" button
   - Access full management interface

---

## 🎨 **Managing Modules**

### **Add New Module**

1. Click "Add Module" button (top right)
2. Fill in:
   - **Module Title** (required) - e.g., "Arabic Grammar Basics"
   - **Description** (optional) - Brief overview
3. Click "Create"
4. Module appears instantly!

### **Edit Module**

1. Click the **Edit icon** (pencil) on any module
2. Update title or description
3. Click "Update"

### **Delete Module**

1. Click the **Delete icon** (trash) on any module
2. Confirm deletion
3. ⚠️ **Warning**: All lessons in the module will also be deleted!

---

## 📖 **Managing Lessons**

### **Add New Lesson**

1. In any module, click "Add Lesson" button
2. Fill in:
   - **Lesson Title** (required) - e.g., "Basic Greetings"
   - **Type** - Video, Text, Quiz, or Assignment
   - **Description** - Brief overview
   - **Content URL** - YouTube URL or resource link
   - **Duration** - Length in minutes
   - **Preview** - Check to allow free preview
3. Click "Create"
4. Lesson appears in the module!

### **Edit Lesson**

1. Click the **Edit icon** on any lesson
2. Update any field
3. Click "Update"
4. Duration auto-updates course total

### **Delete Lesson**

1. Click the **Delete icon** on any lesson
2. Confirm deletion
3. Lesson removed and duration recalculated

---

## ✍️ **Managing Study & Practice Materials**

### **Edit Materials**

1. Click "Materials" button on any lesson
2. You'll see two large text editors:

#### **Study Materials:**

- Use for lesson content, explanations, vocabulary
- **HTML Supported** - Use these tags:
  ```html
  <h3>Heading</h3>
  <p>Paragraph text</p>
  <ul>
    <li>List item</li>
  </ul>
  <strong>Bold text</strong>
  ```

#### **Practice Materials:**

- Use for exercises, scenarios, practice questions
- **HTML Supported** - Same tags as above
- Include answers and explanations

3. Click "Save Materials"
4. Content appears on course page immediately!

### **HTML Formatting Examples**

#### **Study Materials Example:**

```html
<h3>Arabic Family Vocabulary</h3>
<p>Learn the essential words for family members:</p>
<ul>
  <li><strong>أب (Ab)</strong> - Father</li>
  <li><strong>أم (Umm)</strong> - Mother</li>
  <li><strong>أخ (Akh)</strong> - Brother</li>
</ul>
<h4>Cultural Notes:</h4>
<p>Family is very important in Arabic culture...</p>
```

#### **Practice Materials Example:**

```html
<h3>Practice Exercise</h3>
<p><strong>Scenario 1:</strong> Describe your family</p>
<p><strong>Answer:</strong> عندي أب وأم وأخ وأختين</p>
<h4>Role Play:</h4>
<ol>
  <li>Introduce your family members</li>
  <li>Describe their occupations</li>
</ol>
```

---

## 📥 **Managing Resources** (Coming Soon)

Resources like PDFs, videos, and external links will be manageable through:

- API endpoint: `/api/courses/[id]/modules/[moduleId]/lessons/[lessonId]/resources`
- UI will be added to manage page for each lesson

**Resource Types Supported:**

- PDF documents
- Images
- Videos (YouTube, Vimeo)
- External links
- Audio files
- Other documents

---

## 💡 **Tips & Best Practices**

### **Content Organization:**

1. **Start with modules** - Create the overall structure first
2. **Add lessons** - Fill in each module with lessons
3. **Add materials** - Write study and practice content
4. **Add resources** - Attach PDFs, videos, links

### **Writing Study Materials:**

- Use clear headings (`<h3>`, `<h4>`)
- Break content into digestible sections
- Include vocabulary lists
- Add cultural notes and context
- Use bold for key terms (`<strong>`)

### **Writing Practice Materials:**

- Create realistic scenarios
- Provide example answers
- Include step-by-step exercises
- Add role-play activities
- Use numbered lists for instructions

### **Setting Lesson Duration:**

- Be realistic about video/reading time
- Include time for exercises
- Duration auto-calculates course total

### **Using Preview:**

- Check "Allow preview" for intro lessons
- Use to attract students
- Show course quality without requiring enrollment

---

## 🎯 **Workflow Example**

### **Creating a Complete Module:**

1. **Add Module**

   ```
   Title: "Arabic Numbers and Counting"
   Description: "Learn to count and use numbers in Arabic"
   ```

2. **Add First Lesson**

   ```
   Title: "Numbers 1-10"
   Type: Video
   URL: https://www.youtube.com/watch?v=...
   Duration: 15
   Preview: ✓ Checked
   ```

3. **Add Study Materials**

   ```html
   <h3>Arabic Numbers 1-10</h3>
   <ul>
     <li><strong>واحد (Wahid)</strong> - One</li>
     <li><strong>اثنان (Ithnan)</strong> - Two</li>
     ...
   </ul>
   ```

4. **Add Practice Materials**

   ```html
   <h3>Counting Practice</h3>
   <p>Count from 1 to 10 out loud</p>
   <h4>Exercise:</h4>
   <ol>
     <li>Practice counting forwards</li>
     <li>Practice counting backwards</li>
   </ol>
   ```

5. **Result**: Fully functional lesson with rich content!

---

## 🚀 **Features**

### **Current Features:**

- ✅ Unlimited modules per course
- ✅ Unlimited lessons per module
- ✅ Rich HTML content for materials
- ✅ YouTube video integration
- ✅ Drag handles (for future reordering)
- ✅ Auto-save and instant refresh
- ✅ Delete confirmations
- ✅ Form validation

### **Coming Soon:**

- ⏳ Drag-and-drop reordering
- ⏳ Resources management UI
- ⏳ Rich text WYSIWYG editor
- ⏳ File upload for PDFs/images
- ⏳ Video preview in editor
- ⏳ Bulk operations

---

## ⚠️ **Important Notes**

### **Deleting Content:**

- Deleting a module deletes all its lessons
- Deleting a lesson deletes all its resources and exercises
- These actions cannot be undone!
- Always confirm before deleting

### **HTML Content:**

- Make sure HTML tags are properly closed
- Test content after saving
- Use simple tags for best compatibility
- Avoid inline styles (use classes instead)

### **YouTube URLs:**

- Use full YouTube URLs (https://www.youtube.com/watch?v=...)
- Thumbnails auto-generate from video ID
- Videos can be embedded directly

---

## 🎊 **You're All Set!**

You now have complete control over your course content:

- ✅ Create structured courses
- ✅ Add engaging modules
- ✅ Write comprehensive lessons
- ✅ Provide rich study materials
- ✅ Create practice exercises
- ✅ Organize content effectively

**Start building amazing courses for your Islamic Sources platform!** 🚀

---

**Need Help?**

- Check the browser console for errors
- Verify required fields are filled
- Ensure database migration was applied
- Contact support if issues persist
