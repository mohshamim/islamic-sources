"use client";

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

// Singleton browser client for use in client components
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (browserClient) return browserClient;
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !anonKey) {
    throw new Error("Your project's URL and API key are required to create a Supabase client!");
  }
  
  browserClient = createBrowserClient<Database>(url, anonKey);
  return browserClient;
}

// Export singleton instance
export const supabase = createClient();
