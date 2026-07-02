import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url_here') {
  console.warn('[VIG] VITE_SUPABASE_URL is not set. Add it to your .env file.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.warn('[VIG] VITE_SUPABASE_ANON_KEY is not set. Add it to your .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          role: 'user' | 'admin';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      campaigns: {
        Row: {
          id: string;
          user_id: string;
          case_file: string;
          title: string;
          subject_name: string;
          location: string;
          need_type: string;
          report: string;
          goal_amount: number;
          raised_amount: number;
          status: 'urgent' | 'active' | 'closed';
          verified: boolean;
          wallet_sol: string | null;
          wallet_eth: string | null;
          wallet_btc: string | null;
          wallet_usdc: string | null;
          wallet_usdt: string | null;
          wallet_vig: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['campaigns']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['campaigns']['Insert']>;
      };
      donations: {
        Row: {
          id: string;
          campaign_id: string;
          donor_id: string | null;
          donor_name: string;
          amount: number;
          currency: string;
          tx_hash: string | null;
          message: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['donations']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['donations']['Insert']>;
      };
      comments: {
        Row: {
          id: string;
          campaign_id: string;
          user_id: string | null;
          author_name: string;
          message: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['comments']['Insert']>;
      };
      badges: {
        Row: {
          id: string;
          user_id: string;
          badge_type: 'first_responder' | 'community_hero' | 'guardian' | 'elite_vigilante' | 'operation_leader';
          awarded_at: string;
        };
        Insert: Omit<Database['public']['Tables']['badges']['Row'], 'awarded_at'>;
        Update: Partial<Database['public']['Tables']['badges']['Insert']>;
      };
      gallery: {
        Row: {
          id: string;
          title: string;
          type: 'image' | 'banner' | 'clip';
          url: string;
          thumbnail_url: string | null;
          description: string | null;
          file_ref: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['gallery']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['gallery']['Insert']>;
      };
    };
  };
};
