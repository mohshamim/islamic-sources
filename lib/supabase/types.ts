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
      scholars: {
        Row: {
          id: string
          name: string
          slug: string
          title: string
          specialty: string
          bio: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          title: string
          specialty: string
          bio: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          title?: string
          specialty?: string
          bio?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          question: string
          category_id: string
          scholar_id: string | null
          status: 'draft' | 'published' | 'archived'
          views: number
          slug: string
          summary: string | null
          answer: string
          tags: string[]
          language: string
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          question: string
          category_id: string
          scholar_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          views?: number
          slug: string
          summary?: string | null
          answer: string
          tags?: string[]
          language?: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          question?: string
          category_id?: string
          scholar_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          views?: number
          slug?: string
          summary?: string | null
          answer?: string
          tags?: string[]
          language?: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          category_id: string
          scholar_id: string | null
          read_time: string
          views: number
          featured: boolean
          language: string
          cover_image: string | null
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          category_id: string
          scholar_id?: string | null
          read_time: string
          views?: number
          featured?: boolean
          language?: string
          cover_image?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          category_id?: string
          scholar_id?: string | null
          read_time?: string
          views?: number
          featured?: boolean
          language?: string
          cover_image?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      books: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          author: string
          category_id: string
          file_url: string
          file_size: string
          cover_image: string | null
          downloads: number
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          author: string
          category_id: string
          file_url: string
          file_size: string
          cover_image?: string | null
          downloads?: number
          language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          author?: string
          category_id?: string
          file_url?: string
          file_size?: string
          cover_image?: string | null
          downloads?: number
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          title: string
          type: 'pdf' | 'audio' | 'video' | 'image'
          category_id: string
          file_url: string
          file_size: string
          thumbnail: string | null
          duration: string | null
          views: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          type: 'pdf' | 'audio' | 'video' | 'image'
          category_id: string
          file_url: string
          file_size: string
          thumbnail?: string | null
          duration?: string | null
          views?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: 'pdf' | 'audio' | 'video' | 'image'
          category_id?: string
          file_url?: string
          file_size?: string
          thumbnail?: string | null
          duration?: string | null
          views?: number
          created_at?: string
        }
      }
      user_questions: {
        Row: {
          id: string
          name: string
          email: string
          category_id: string
          question: string
          status: 'pending' | 'approved' | 'rejected' | 'converted'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          category_id: string
          question: string
          status?: 'pending' | 'approved' | 'rejected' | 'converted'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          category_id?: string
          question?: string
          status?: 'pending' | 'approved' | 'rejected' | 'converted'
          created_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          status: 'unread' | 'read' | 'replied' | 'archived'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          status?: 'unread' | 'read' | 'replied' | 'archived'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          status?: 'unread' | 'read' | 'replied' | 'archived'
          created_at?: string
        }
      }
      stats: {
        Row: {
          id: string
          total_articles: number
          total_questions: number
          total_books: number
          total_media: number
          total_views: number
          total_downloads: number
          updated_at: string
        }
        Insert: {
          id?: string
          total_articles?: number
          total_questions?: number
          total_books?: number
          total_media?: number
          total_views?: number
          total_downloads?: number
          updated_at?: string
        }
        Update: {
          id?: string
          total_articles?: number
          total_questions?: number
          total_books?: number
          total_media?: number
          total_views?: number
          total_downloads?: number
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

