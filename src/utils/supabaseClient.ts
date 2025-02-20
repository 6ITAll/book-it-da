import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // 세션 감지 추가
  },
  // 실시간 연결 설정 추가
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  // 글로벌 설정 추가
  global: {
    headers: {
      'Cache-Control': 'no-cache',
    },
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
