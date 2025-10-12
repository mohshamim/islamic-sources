import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Admin client with service_role key - bypasses RLS
export function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log('Admin client - URL exists:', !!supabaseUrl);
  console.log('Admin client - Service key exists:', !!supabaseServiceKey);
  console.log('Admin client - Service key length:', supabaseServiceKey?.length);
  
  if (!supabaseUrl) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required');
  }
  
  if (!supabaseServiceKey) {
    console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required. Please add it to your Vercel environment variables.');
  }
  
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

