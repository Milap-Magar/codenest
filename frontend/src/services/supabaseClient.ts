import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anon);

// Fall back to placeholder values so the app still boots without a configured
// backend — lets you demo the landing page before wiring Supabase. API calls
// will fail loudly at runtime, but the module itself does not throw.
export const supabase = createClient(
  url ?? 'http://localhost:54321',
  anon ?? 'public-anon-key-placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
