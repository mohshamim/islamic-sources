"use client";

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

// Singleton browser client for use in client components
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (browserClient) return browserClient;
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // During build time, return a mock client to prevent errors
  if (typeof window === 'undefined' || !url || !anonKey) {
    // Return a mock client during SSR/build
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        updateUser: () => Promise.resolve({ data: null, error: null }),
        resetPasswordForEmail: () => Promise.resolve({ data: null, error: null }),
        refreshSession: () => Promise.resolve({ data: { session: null }, error: null }),
      }
    } as any;
  }
  
  browserClient = createBrowserClient<Database>(url, anonKey);
  return browserClient;
}

// Export singleton instance
export const supabase = createClient();
