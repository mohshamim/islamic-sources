# 🚀 Cursor Context - Islamic Sources Platform

## ⚡ Quick Project Summary

**Status**: Public website 100% complete with mock data. Ready for admin dashboard development.

**Next Priority**: Implement backend admin dashboard for content management.

## 🎯 What's Working Right Now

### ✅ Complete Public Website
- **Homepage** (`/`) - Two-column layout with trending content
- **Content Pages** - Articles, Posts, Questions, Courses, Media
- **Detail Pages** - Individual content with full display
- **Navigation** - Sidebar, header, responsive design
- **Authentication UI** - Sign in/up forms (not connected to backend)

### 📊 Mock Data Structure
- 5 Posts with full Islamic content
- 4 Articles with scholarly topics  
- 5 Questions with detailed answers
- 6 Courses with modules and reviews
- 3 PDF Books with download counts
- Platform statistics

## 🔧 Technical Stack
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS + Shadcn/ui
- **Data**: Mock JSON data (ready for backend replacement)
- **Auth**: NextAuth.js + Supabase (UI ready, backend pending)
- **Database**: Supabase + MongoDB (planned)

## 🚨 Critical Next Steps

### 1. Admin Dashboard (HIGH PRIORITY)
```bash
# Create admin dashboard
app/admin/dashboard/page.tsx
```
**Features needed**:
- CRUD operations for all content types
- File upload system
- User management
- Content approval workflow

### 2. Database Integration
```bash
# Set up database schema
supabase/
├── migrations/
└── schema.sql
```

### 3. API Development
```bash
# Create API routes
app/api/
├── posts/
├── articles/
├── questions/
├── media/
└── courses/
```

## 📁 Key Files to Know

### Mock Data (Replace with Backend)
- `lib/mock-data.json` - All sample content
- `app/page.tsx` - Homepage using mock data
- `app/posts/page.tsx` - Posts listing using mock data
- `app/questions/page.tsx` - Questions listing using mock data

### Layout Components
- `components/layout/main-layout.tsx` - Main layout with sidebar
- `components/layout/public-sidebar.tsx` - Navigation sidebar
- `components/layout/navbar.tsx` - Header navigation

### Content Pages
- `app/posts/[slug]/page.tsx` - Individual post display
- `app/questions/[slug]/page.tsx` - Individual question display
- `app/articles/[slug]/page.tsx` - Individual article display

## 🎨 Design System

### Colors
- **Primary**: Green (#059669) - Islamic theme
- **Secondary**: Blue (#2563eb) - Trust/knowledge
- **Accent**: Purple (#7c3aed) - Premium content

### Components
- All use Shadcn/ui base components
- Consistent spacing with Tailwind CSS
- Responsive design (mobile-first)
- Dark mode support

## 🔄 Development Workflow

### Current State
1. All public pages work with mock data
2. Navigation flows are complete
3. UI/UX design is finalized
4. Ready for backend integration

### Next Development Phase
1. **Week 1**: Create admin dashboard layout
2. **Week 2**: Implement CRUD operations
3. **Week 3**: Set up database and APIs
4. **Week 4**: Connect frontend to backend
5. **Week 5**: Add advanced features
6. **Week 6**: Testing and optimization

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Check linting
npm run lint
```

## 📋 Environment Setup

```env
# Required for backend development
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## 🎯 Success Criteria

### Phase 1: Admin Dashboard
- [ ] Admin login/logout functionality
- [ ] Content management interface
- [ ] File upload system
- [ ] User role management

### Phase 2: Backend Integration
- [ ] Database schema implementation
- [ ] API endpoints for all content types
- [ ] Authentication system
- [ ] Real data replacing mock data

### Phase 3: Advanced Features
- [ ] Rich text editor
- [ ] Content scheduling
- [ ] Analytics dashboard
- [ ] SEO optimization

## 📞 Getting Help

1. **Check Documentation**: `PROJECT-DOCUMENTATION.md` for detailed info
2. **Review Mock Data**: `lib/mock-data.json` for data structure reference
3. **Examine Components**: `components/` folder for UI patterns
4. **Check Pages**: `app/` folder for page implementations

## 🔍 Common Issues & Solutions

### Issue: Page not loading
**Solution**: Check if mock data exists in `lib/mock-data.json`

### Issue: Navigation broken
**Solution**: Verify slug-based routing in detail pages

### Issue: Styling issues
**Solution**: Check Tailwind classes and Shadcn/ui component usage

### Issue: TypeScript errors
**Solution**: Ensure proper type definitions for mock data

---

**Last Updated**: January 2025  
**Project Status**: Public website complete, admin dashboard pending  
**Next Milestone**: Backend admin dashboard implementation
