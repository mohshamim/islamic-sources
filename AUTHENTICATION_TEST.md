# 🧪 Authentication Testing Guide

## ✅ Quick Test Steps

### Step 1: Create Admin User in Supabase

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com/project/ioihqcimivmwnasckkig
2. **Navigate to Authentication**
   - Click **Authentication** in left sidebar
   - Click **Users** tab
3. **Add New User**
   - Click **Add User** button (top right)
   - Select **Create new user**
   - Fill in:
     ```
     Email: admin@islamicsources.com
     Password: Admin@123456
     ```
   - ✅ Check: **Auto Confirm User**
   - Click **Create User**

### Step 2: Test Login

1. **Open Application**
   - Navigate to: `http://localhost:3000/admin/login`
2. **Enter Credentials**
   ```
   Email: admin@islamicsources.com
   Password: Admin@123456
   ```
3. **Click "Sign In"**
   - Should show loading spinner
   - Should redirect to `/admin/dashboard`
   - Dashboard should show: "Logged in as: admin@islamicsources.com"

### Step 3: Test Protected Routes

1. **Open Incognito/Private Window**

2. **Try to Access Dashboard Directly**
   - Navigate to: `http://localhost:3000/admin/dashboard`
   - Should auto-redirect to: `/admin/login`
3. **Login and Verify Return**
   - URL should have: `?redirectTo=/admin/dashboard`
   - After login, should return to dashboard

### Step 4: Test Sign Out

1. **From Dashboard**
   - Click **Sign Out** button (top right)
2. **Verify Redirect**
   - Should redirect to `/admin/login`
3. **Try Accessing Dashboard Again**
   - Navigate to: `/admin/dashboard`
   - Should redirect to login (session cleared)

### Step 5: Test Forgot Password

1. **From Login Page**
   - Click **Forgot password?** link
2. **Enter Email**
   ```
   Email: admin@islamicsources.com
   ```
3. **Click "Send Reset Link"**
   - Should show success message
   - Check email for reset link (if email is configured)

---

## 🎯 Expected Behavior

| Test                                      | Expected Result                                        |
| ----------------------------------------- | ------------------------------------------------------ |
| Visit `/admin/login` while logged out     | Show login form                                        |
| Visit `/admin/login` while logged in      | Redirect to `/admin/dashboard`                         |
| Visit `/admin/dashboard` while logged out | Redirect to `/admin/login?redirectTo=/admin/dashboard` |
| Visit `/admin/dashboard` while logged in  | Show dashboard with user email                         |
| Click "Sign Out"                          | Redirect to `/admin/login` and clear session           |
| Wrong credentials                         | Show error: "Invalid email or password"                |
| Correct credentials                       | Redirect to dashboard                                  |

---

## ✅ Checklist

- [ ] Dev server is running (`npm run dev`)
- [ ] Admin user created in Supabase
- [ ] Can access `/admin/login` page
- [ ] Can login with correct credentials
- [ ] Redirects to dashboard after login
- [ ] Dashboard shows user email
- [ ] Can sign out
- [ ] Protected routes redirect when not logged in
- [ ] Returns to intended page after login

---

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution**: Check `.env.local` file exists and has correct values

### Issue: Login button does nothing

**Solution**: Check browser console for errors. Verify Supabase credentials are correct

### Issue: "Invalid email or password"

**Solution**:

- Verify user exists in Supabase > Authentication > Users
- Check email is confirmed (Auto Confirm User was checked)
- Verify password is correct

### Issue: Redirect loop

**Solution**: Clear browser cookies and try again

### Issue: Build errors

**Solution**: All apostrophes in About page have been escaped with `&apos;`

---

## 🎉 Success Indicators

When authentication is working correctly:

✅ Can see login page at `/admin/login`
✅ Can create account in Supabase dashboard
✅ Can login with valid credentials  
✅ Redirected to dashboard after login
✅ Dashboard shows "Logged in as: [email]"
✅ Can sign out and session clears
✅ Protected routes redirect when not authenticated
✅ No console errors

---

## 📸 Screenshots to Verify

### Login Page

![Login Page](should show: email/password form, logo, gradient background)

### Dashboard

![Dashboard](should show: welcome message, user email, sign out button, stats cards)

### Protected Route Test

![Protected](should show: automatic redirect to login when accessing /admin/dashboard without auth)

---

**Ready to Test!** 🚀

Start here: http://localhost:3000/admin/login
