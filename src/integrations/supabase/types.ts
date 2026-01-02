export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      candidature_documents: {
        Row: {
          candidature_id: string
          created_at: string
          document_type: string | null
          file_url: string | null
          id: string
          name: string
        }
        Insert: {
          candidature_id: string
          created_at?: string
          document_type?: string | null
          file_url?: string | null
          id?: string
          name: string
        }
        Update: {
          candidature_id?: string
          created_at?: string
          document_type?: string | null
          file_url?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidature_documents_candidature_id_fkey"
            columns: ["candidature_id"]
            isOneToOne: false
            referencedRelation: "candidatures"
            referencedColumns: ["id"]
          },
        ]
      }
      candidatures: {
        Row: {
          adresse: string | null
          created_at: string
          cv_url: string | null
          disponibilite: string | null
          email: string
          experience: string | null
          id: string
          nom: string
          poste: string
          prenom: string
          rejection_reason: string | null
          status: string
          telephone: string | null
          updated_at: string
          user_id: string | null
          validated_at: string | null
          validated_by: string | null
          ville: string | null
        }
        Insert: {
          adresse?: string | null
          created_at?: string
          cv_url?: string | null
          disponibilite?: string | null
          email: string
          experience?: string | null
          id?: string
          nom: string
          poste: string
          prenom: string
          rejection_reason?: string | null
          status?: string
          telephone?: string | null
          updated_at?: string
          user_id?: string | null
          validated_at?: string | null
          validated_by?: string | null
          ville?: string | null
        }
        Update: {
          adresse?: string | null
          created_at?: string
          cv_url?: string | null
          disponibilite?: string | null
          email?: string
          experience?: string | null
          id?: string
          nom?: string
          poste?: string
          prenom?: string
          rejection_reason?: string | null
          status?: string
          telephone?: string | null
          updated_at?: string
          user_id?: string | null
          validated_at?: string | null
          validated_by?: string | null
          ville?: string | null
        }
        Relationships: []
      }
      mission_history: {
        Row: {
          candidat_id: string
          created_at: string
          date_debut: string | null
          date_fin: string | null
          entreprise_name: string
          id: string
          lieu: string | null
          note: string | null
          offre_id: string | null
          status: string
          titre: string
          updated_at: string
        }
        Insert: {
          candidat_id: string
          created_at?: string
          date_debut?: string | null
          date_fin?: string | null
          entreprise_name: string
          id?: string
          lieu?: string | null
          note?: string | null
          offre_id?: string | null
          status?: string
          titre: string
          updated_at?: string
        }
        Update: {
          candidat_id?: string
          created_at?: string
          date_debut?: string | null
          date_fin?: string | null
          entreprise_name?: string
          id?: string
          lieu?: string | null
          note?: string | null
          offre_id?: string | null
          status?: string
          titre?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_history_offre_id_fkey"
            columns: ["offre_id"]
            isOneToOne: false
            referencedRelation: "offres"
            referencedColumns: ["id"]
          },
        ]
      }
      offre_candidatures: {
        Row: {
          admin_rejection_reason: string | null
          admin_status: string
          admin_validated_at: string | null
          admin_validated_by: string | null
          candidat_id: string
          created_at: string
          entreprise_rejection_reason: string | null
          entreprise_response_at: string | null
          entreprise_status: string
          id: string
          offre_id: string
          type: string
          updated_at: string
        }
        Insert: {
          admin_rejection_reason?: string | null
          admin_status?: string
          admin_validated_at?: string | null
          admin_validated_by?: string | null
          candidat_id: string
          created_at?: string
          entreprise_rejection_reason?: string | null
          entreprise_response_at?: string | null
          entreprise_status?: string
          id?: string
          offre_id: string
          type?: string
          updated_at?: string
        }
        Update: {
          admin_rejection_reason?: string | null
          admin_status?: string
          admin_validated_at?: string | null
          admin_validated_by?: string | null
          candidat_id?: string
          created_at?: string
          entreprise_rejection_reason?: string | null
          entreprise_response_at?: string | null
          entreprise_status?: string
          id?: string
          offre_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offre_candidatures_candidat_id_fkey"
            columns: ["candidat_id"]
            isOneToOne: false
            referencedRelation: "candidatures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offre_candidatures_offre_id_fkey"
            columns: ["offre_id"]
            isOneToOne: false
            referencedRelation: "offres"
            referencedColumns: ["id"]
          },
        ]
      }
      offres: {
        Row: {
          avantages: string | null
          candidat_place_id: string | null
          created_at: string
          created_by: string | null
          date_debut: string | null
          date_fin: string | null
          description: string | null
          experience_requise: string | null
          horaires: string | null
          id: string
          lieu: string
          salaire_max: number | null
          salaire_min: number | null
          status: string
          titre: string
          type_contrat: string
          updated_at: string
        }
        Insert: {
          avantages?: string | null
          candidat_place_id?: string | null
          created_at?: string
          created_by?: string | null
          date_debut?: string | null
          date_fin?: string | null
          description?: string | null
          experience_requise?: string | null
          horaires?: string | null
          id?: string
          lieu: string
          salaire_max?: number | null
          salaire_min?: number | null
          status?: string
          titre: string
          type_contrat?: string
          updated_at?: string
        }
        Update: {
          avantages?: string | null
          candidat_place_id?: string | null
          created_at?: string
          created_by?: string | null
          date_debut?: string | null
          date_fin?: string | null
          description?: string | null
          experience_requise?: string | null
          horaires?: string | null
          id?: string
          lieu?: string
          salaire_max?: number | null
          salaire_min?: number | null
          status?: string
          titre?: string
          type_contrat?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offres_candidat_place_id_fkey"
            columns: ["candidat_place_id"]
            isOneToOne: false
            referencedRelation: "candidatures"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          approval_date: string | null
          approval_status: string | null
          approved_by: string | null
          avatar_url: string | null
          city: string | null
          company_name: string | null
          competences: string | null
          created_at: string
          cv_url: string | null
          deplacement: string | null
          description: string | null
          email: string | null
          employees_count: string | null
          experience: string | null
          first_name: string | null
          id: string
          last_name: string | null
          metier: string | null
          mission_status: string | null
          mobilite: string | null
          permis: string | null
          phone: string | null
          postal_code: string | null
          rejection_reason: string | null
          sector: string | null
          siret: string | null
          updated_at: string
          user_id: string | null
          user_type: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          approval_date?: string | null
          approval_status?: string | null
          approved_by?: string | null
          avatar_url?: string | null
          city?: string | null
          company_name?: string | null
          competences?: string | null
          created_at?: string
          cv_url?: string | null
          deplacement?: string | null
          description?: string | null
          email?: string | null
          employees_count?: string | null
          experience?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          metier?: string | null
          mission_status?: string | null
          mobilite?: string | null
          permis?: string | null
          phone?: string | null
          postal_code?: string | null
          rejection_reason?: string | null
          sector?: string | null
          siret?: string | null
          updated_at?: string
          user_id?: string | null
          user_type?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          approval_date?: string | null
          approval_status?: string | null
          approved_by?: string | null
          avatar_url?: string | null
          city?: string | null
          company_name?: string | null
          competences?: string | null
          created_at?: string
          cv_url?: string | null
          deplacement?: string | null
          description?: string | null
          email?: string | null
          employees_count?: string | null
          experience?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          metier?: string | null
          mission_status?: string | null
          mobilite?: string | null
          permis?: string | null
          phone?: string | null
          postal_code?: string | null
          rejection_reason?: string | null
          sector?: string | null
          siret?: string | null
          updated_at?: string
          user_id?: string | null
          user_type?: string | null
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "recruiter" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "recruiter", "user"],
    },
  },
} as const
