export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: 'admin' | 'member' | 'pending'
          phone: string | null
          pole: string | null
          bio: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          role?: 'admin' | 'member' | 'pending'
          phone?: string | null
          pole?: string | null
          bio?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          role?: 'admin' | 'member' | 'pending'
          phone?: string | null
          pole?: string | null
          bio?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_verifications: {
        Row: {
          id: string
          user_id: string
          admin_notes: string | null
          status: 'pending' | 'approved' | 'rejected'
          verified_at: string | null
          verified_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          admin_notes?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          verified_at?: string | null
          verified_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          admin_notes?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          verified_at?: string | null
          verified_by?: string | null
          created_at?: string
        }
      }
      admin_notifications: {
        Row: {
          id: string
          type: string
          title: string
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          title: string
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          title?: string
          content?: string
          read?: boolean
          created_at?: string
        }
      }
    }
  }
}