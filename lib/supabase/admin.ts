import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Admin client with service_role key - bypasses RLS
export function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  console.log('Admin client - URL exists:', !!supabaseUrl);
  console.log('Admin client - Service key exists:', !!supabaseServiceKey);
  console.log('Admin client - Service key length:', supabaseServiceKey?.length);
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables:', {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey
    });
    throw new Error('Missing Supabase environment variables. Make sure SUPABASE_SERVICE_ROLE_KEY is set in .env.local');
  }
  
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

