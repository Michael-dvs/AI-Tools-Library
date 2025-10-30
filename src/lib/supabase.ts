import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface AITool {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string;
  logo_url: string;
  category: string;
  rating: number;
  total_ratings: number;
  api_endpoint: string;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  tool_id: string;
  created_at: string;
}

export interface Comparison {
  id: string;
  user_id: string | null;
  prompt: string;
  tool_ids: string[];
  created_at: string;
}
