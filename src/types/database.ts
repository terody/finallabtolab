export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      downloads: {
        Row: {
          created_at: string
          filename: string | null
          filetype: string | null
          id: string
          lab_id: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          filename?: string | null
          filetype?: string | null
          id?: string
          lab_id?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          filename?: string | null
          filetype?: string | null
          id?: string
          lab_id?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "downloads_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "lab"
            referencedColumns: ["id"]
          },
        ]
      }
      lab: {
        Row: {
          about: string | null
          address: string | null
          certifications: string[] | null
          claimed: boolean | null
          claimed_by: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          image: string | null
          location: string | null
          name: string
          phone: string | null
          references: string[] | null
          services: string[] | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          certifications?: string[] | null
          claimed?: boolean | null
          claimed_by?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          image?: string | null
          location?: string | null
          name: string
          phone?: string | null
          references?: string[] | null
          services?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          address?: string | null
          certifications?: string[] | null
          claimed?: boolean | null
          claimed_by?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          image?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          references?: string[] | null
          services?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      marketplace_listing: {
        Row: {
          budget: string | null
          created_at: string | null
          created_by: string | null
          deadline: string | null
          description: string | null
          id: string
          title: string
        }
        Insert: {
          budget?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          budget?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      news_article: {
        Row: {
          author: string | null
          description: string | null
          id: string
          image_url: string | null
          published_at: string | null
          source: string | null
          title: string
          url: string | null
        }
        Insert: {
          author?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          source?: string | null
          title: string
          url?: string | null
        }
        Update: {
          author?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          source?: string | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      news_comment: {
        Row: {
          author: string | null
          content: string | null
          created_at: string
          id: string
          likes: number | null
          news_article: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string
          id?: string
          likes?: number | null
          news_article?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string
          id?: string
          likes?: number | null
          news_article?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_comment_news_article_fkey"
            columns: ["news_article"]
            isOneToOne: false
            referencedRelation: "news_article"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          image_url: string
          is_featured: boolean | null
          technologies: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description: string
          id?: string
          image_url: string
          is_featured?: boolean | null
          technologies?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string
          is_featured?: boolean | null
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          certifications: string[] | null
          company: string | null
          createat: string | null
          details: Json | null
          email: string
          id: string
          keywords: string[] | null
          lastlogin: string | null
          name: string | null
          permissions: Json | null
          role: string
          skills: string[] | null
          title: string | null
        }
        Insert: {
          certifications?: string[] | null
          company?: string | null
          createat?: string | null
          details?: Json | null
          email: string
          id: string
          keywords?: string[] | null
          lastlogin?: string | null
          name?: string | null
          permissions?: Json | null
          role?: string
          skills?: string[] | null
          title?: string | null
        }
        Update: {
          certifications?: string[] | null
          company?: string | null
          createat?: string | null
          details?: Json | null
          email?: string
          id?: string
          keywords?: string[] | null
          lastlogin?: string | null
          name?: string | null
          permissions?: Json | null
          role?: string
          skills?: string[] | null
          title?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
