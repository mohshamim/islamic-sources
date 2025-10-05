import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from './lib/database.types.learning'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password', '/auth/reset-password', '/', '/articles', '/posts', '/questions', '/media', '/courses']
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))

  // Protected admin routes
  const isAdminRoute = pathname.startsWith('/admin')
  
  // Protected user routes
  const isUserRoute = pathname.startsWith('/user')

  // If trying to access protected routes without authentication
  if (!user && (isAdminRoute || isUserRoute)) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/signin'
    return NextResponse.redirect(url)
  }

  // If authenticated, check role-based access
  if (user) {
    // Fetch user profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // Redirect admin users trying to access user routes
    if (profile?.role === 'admin' && isUserRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/dashboard'
      return NextResponse.redirect(url)
    }

    // Redirect regular users trying to access admin routes
    if (profile?.role !== 'admin' && isAdminRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/user/dashboard'
      return NextResponse.redirect(url)
    }

    // Redirect from generic /dashboard to role-specific dashboard
    if (pathname === '/dashboard') {
      const url = request.nextUrl.clone()
      url.pathname = profile?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}