import { useAuth as useAuthContext } from '@/lib/auth/auth-context';

/**
 * Custom hook to access authentication context
 * This is a convenience wrapper around the auth context
 */
export function useAuth() {
  return useAuthContext();
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 */
export function useRequireAuth() {
  const auth = useAuthContext();
  
  if (!auth.loading && !auth.user) {
    // Redirect will be handled by middleware
    return null;
  }
  
  return auth;
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  const { user, loading } = useAuthContext();
  return { isAuthenticated: !!user, loading };
}

/**
 * Hook to check if user is admin
 */
export function useIsAdmin() {
  const { isAdmin, loading } = useAuthContext();
  return { isAdmin, loading };
}

