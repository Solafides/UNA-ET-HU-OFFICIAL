
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    // Check if running on client or server to avoid build errors if env vars are missing during build
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.warn('Missing Supabase environment variables. File upload will not work.');
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
