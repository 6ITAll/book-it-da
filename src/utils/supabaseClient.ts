import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export async function testConnection() {
  try {
    const { data, error } = await supabase.from('User').select('*').limit(1);
    if (error) throw error;
    console.log('Connection successful!', data);
    return true;
  } catch (error) {
    console.error('Connection failed:', error);
    return false;
  }
}
