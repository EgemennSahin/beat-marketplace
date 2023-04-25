export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      beats: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          price: number;
          user_id: string;
          user_name?: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          price?: number;
          user_id: string;
          user_name?: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          price?: number;
          user_id?: string;
          user_name?: string;
        };
      };
      transactions: {
        Row: {
          beat_id: number | null;
          buyer_id: string | null;
          created_at: string | null;
          id: number;
        };
        Insert: {
          beat_id?: number | null;
          buyer_id?: string | null;
          created_at?: string | null;
          id?: number;
        };
        Update: {
          beat_id?: number | null;
          buyer_id?: string | null;
          created_at?: string | null;
          id?: number;
        };
      };
      users: {
        Row: {
          created_at: string | null;
          id: string;
          role: string;
          user_name: string;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          role?: string;
          user_name: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          role?: string;
          user_name?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
