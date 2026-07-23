// =====================================================================
// Tipos de la base de datos FEHNA (auto-generados desde Supabase).
// Regenerar con:  npx supabase gen types typescript --project-id tmpubpndujcyeablirah > src/lib/database.types.ts
// No editar a mano: se sobrescribe al regenerar.
// =====================================================================
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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categorias: {
        Row: {
          edad_max: number
          edad_min: number
          id: number
          nombre: string
        }
        Insert: {
          edad_max: number
          edad_min: number
          id?: never
          nombre: string
        }
        Update: {
          edad_max?: number
          edad_min?: number
          id?: never
          nombre?: string
        }
        Relationships: []
      }
      clubes: {
        Row: {
          abreviatura: string | null
          activo: boolean
          ciudad: string | null
          creado_en: string
          id: number
          nombre: string
        }
        Insert: {
          abreviatura?: string | null
          activo?: boolean
          ciudad?: string | null
          creado_en?: string
          id?: never
          nombre: string
        }
        Update: {
          abreviatura?: string | null
          activo?: boolean
          ciudad?: string | null
          creado_en?: string
          id?: never
          nombre?: string
        }
        Relationships: []
      }
      configuracion_secciones: {
        Row: {
          actualizada_en: string
          id: number
          seccion: string
          visible: boolean
        }
        Insert: {
          actualizada_en?: string
          id?: never
          seccion: string
          visible?: boolean
        }
        Update: {
          actualizada_en?: string
          id?: never
          seccion?: string
          visible?: boolean
        }
        Relationships: []
      }
      deportistas: {
        Row: {
          activo: boolean
          apellidos: string
          club_id: number | null
          creado_en: string
          fecha_nacimiento: string
          id: number
          nombres: string
          sexo: Database["public"]["Enums"]["sexo_tipo"]
        }
        Insert: {
          activo?: boolean
          apellidos: string
          club_id?: number | null
          creado_en?: string
          fecha_nacimiento: string
          id?: never
          nombres: string
          sexo: Database["public"]["Enums"]["sexo_tipo"]
        }
        Update: {
          activo?: boolean
          apellidos?: string
          club_id?: number | null
          creado_en?: string
          fecha_nacimiento?: string
          id?: never
          nombres?: string
          sexo?: Database["public"]["Enums"]["sexo_tipo"]
        }
        Relationships: [
          {
            foreignKeyName: "deportistas_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubes"
            referencedColumns: ["id"]
          },
        ]
      }
      estilos: {
        Row: {
          activo: boolean
          id: number
          nombre: string
        }
        Insert: {
          activo?: boolean
          id?: never
          nombre: string
        }
        Update: {
          activo?: boolean
          id?: never
          nombre?: string
        }
        Relationships: []
      }
      eventos: {
        Row: {
          creado_en: string
          descripcion: string | null
          fecha_fin: string | null
          fecha_inicio: string
          id: number
          nombre: string
          piscina_id: number
          publicado: boolean
          sede: string | null
        }
        Insert: {
          creado_en?: string
          descripcion?: string | null
          fecha_fin?: string | null
          fecha_inicio: string
          id?: never
          nombre: string
          piscina_id: number
          publicado?: boolean
          sede?: string | null
        }
        Update: {
          creado_en?: string
          descripcion?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string
          id?: never
          nombre?: string
          piscina_id?: number
          publicado?: boolean
          sede?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eventos_piscina_id_fkey"
            columns: ["piscina_id"]
            isOneToOne: false
            referencedRelation: "tipos_piscina"
            referencedColumns: ["id"]
          },
        ]
      }
      informacion_contacto: {
        Row: {
          actualizada_en: string
          creado_en: string
          descripcion: string
          icono: string
          id: number
          orden: number
          titulo: string
          visible: boolean
        }
        Insert: {
          actualizada_en?: string
          creado_en?: string
          descripcion: string
          icono: string
          id?: never
          orden?: number
          titulo: string
          visible?: boolean
        }
        Update: {
          actualizada_en?: string
          creado_en?: string
          descripcion?: string
          icono?: string
          id?: never
          orden?: number
          titulo?: string
          visible?: boolean
        }
        Relationships: []
      }
      medios: {
        Row: {
          actualizada_en: string
          alto: number | null
          ancho: number | null
          bucket: string
          creado_en: string
          descripcion: string | null
          entidad_id: number | null
          es_portada: boolean
          es_publico: boolean
          id: number
          mime_type: string | null
          modulo: Database["public"]["Enums"]["modulo_medio"]
          orden: number
          path: string
          subido_por: string | null
          tamano_bytes: number | null
          tipo: Database["public"]["Enums"]["tipo_medio"]
          titulo: string | null
        }
        Insert: {
          actualizada_en?: string
          alto?: number | null
          ancho?: number | null
          bucket: string
          creado_en?: string
          descripcion?: string | null
          entidad_id?: number | null
          es_portada?: boolean
          es_publico?: boolean
          id?: never
          mime_type?: string | null
          modulo: Database["public"]["Enums"]["modulo_medio"]
          orden?: number
          path: string
          subido_por?: string | null
          tamano_bytes?: number | null
          tipo?: Database["public"]["Enums"]["tipo_medio"]
          titulo?: string | null
        }
        Update: {
          actualizada_en?: string
          alto?: number | null
          ancho?: number | null
          bucket?: string
          creado_en?: string
          descripcion?: string | null
          entidad_id?: number | null
          es_portada?: boolean
          es_publico?: boolean
          id?: never
          mime_type?: string | null
          modulo?: Database["public"]["Enums"]["modulo_medio"]
          orden?: number
          path?: string
          subido_por?: string | null
          tamano_bytes?: number | null
          tipo?: Database["public"]["Enums"]["tipo_medio"]
          titulo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medios_subido_por_fkey"
            columns: ["subido_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      noticias: {
        Row: {
          actualizada_en: string
          contenido: string
          creada_en: string
          fecha_publicacion: string | null
          id: number
          imagen_portada: string | null
          publicada: boolean
          resumen: string | null
          slug: string
          titulo: string
        }
        Insert: {
          actualizada_en?: string
          contenido: string
          creada_en?: string
          fecha_publicacion?: string | null
          id?: never
          imagen_portada?: string | null
          publicada?: boolean
          resumen?: string | null
          slug: string
          titulo: string
        }
        Update: {
          actualizada_en?: string
          contenido?: string
          creada_en?: string
          fecha_publicacion?: string | null
          id?: never
          imagen_portada?: string | null
          publicada?: boolean
          resumen?: string | null
          slug?: string
          titulo?: string
        }
        Relationships: []
      }
      patrocinadores: {
        Row: {
          actualizada_en: string
          creado_en: string
          id: number
          logo_url: string
          nombre: string
          orden: number
          visible: boolean
        }
        Insert: {
          actualizada_en?: string
          creado_en?: string
          id?: never
          logo_url: string
          nombre: string
          orden?: number
          visible?: boolean
        }
        Update: {
          actualizada_en?: string
          creado_en?: string
          id?: never
          logo_url?: string
          nombre?: string
          orden?: number
          visible?: boolean
        }
        Relationships: []
      }
      perfiles: {
        Row: {
          activo: boolean
          creado_en: string
          id: string
          nombre: string
          rol: Database["public"]["Enums"]["rol_tipo"]
        }
        Insert: {
          activo?: boolean
          creado_en?: string
          id: string
          nombre: string
          rol?: Database["public"]["Enums"]["rol_tipo"]
        }
        Update: {
          activo?: boolean
          creado_en?: string
          id?: string
          nombre?: string
          rol?: Database["public"]["Enums"]["rol_tipo"]
        }
        Relationships: []
      }
      pruebas: {
        Row: {
          distancia: number
          estilo_id: number
          id: number
        }
        Insert: {
          distancia: number
          estilo_id: number
          id?: never
        }
        Update: {
          distancia?: number
          estilo_id?: number
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "pruebas_estilo_id_fkey"
            columns: ["estilo_id"]
            isOneToOne: false
            referencedRelation: "estilos"
            referencedColumns: ["id"]
          },
        ]
      }
      redes_sociales: {
        Row: {
          actualizada_en: string
          creado_en: string
          id: number
          orden: number
          red: Database["public"]["Enums"]["tipo_red_social"]
          url: string
          visible: boolean
        }
        Insert: {
          actualizada_en?: string
          creado_en?: string
          id?: never
          orden?: number
          red: Database["public"]["Enums"]["tipo_red_social"]
          url: string
          visible?: boolean
        }
        Update: {
          actualizada_en?: string
          creado_en?: string
          id?: never
          orden?: number
          red?: Database["public"]["Enums"]["tipo_red_social"]
          url?: string
          visible?: boolean
        }
        Relationships: []
      }
      tiempos: {
        Row: {
          categoria_id: number
          creado_en: string
          deportista_id: number
          edad_evento: number
          evento_id: number
          id: number
          posicion: number | null
          prueba_id: number
          puntos: number | null
          registrado_por: string | null
          tiempo_final: number
          tiempo_siembra: number | null
        }
        Insert: {
          categoria_id: number
          creado_en?: string
          deportista_id: number
          edad_evento: number
          evento_id: number
          id?: never
          posicion?: number | null
          prueba_id: number
          puntos?: number | null
          registrado_por?: string | null
          tiempo_final: number
          tiempo_siembra?: number | null
        }
        Update: {
          categoria_id?: number
          creado_en?: string
          deportista_id?: number
          edad_evento?: number
          evento_id?: number
          id?: never
          posicion?: number | null
          prueba_id?: number
          puntos?: number | null
          registrado_por?: string | null
          tiempo_final?: number
          tiempo_siembra?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tiempos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tiempos_deportista_id_fkey"
            columns: ["deportista_id"]
            isOneToOne: false
            referencedRelation: "deportistas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tiempos_evento_id_fkey"
            columns: ["evento_id"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tiempos_prueba_id_fkey"
            columns: ["prueba_id"]
            isOneToOne: false
            referencedRelation: "pruebas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tiempos_registrado_por_fkey"
            columns: ["registrado_por"]
            isOneToOne: false
            referencedRelation: "perfiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tipos_piscina: {
        Row: {
          activo: boolean
          codigo: string
          id: number
          metros: number
          nombre: string
        }
        Insert: {
          activo?: boolean
          codigo: string
          id?: never
          metros: number
          nombre: string
        }
        Update: {
          activo?: boolean
          codigo?: string
          id?: never
          metros?: number
          nombre?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      es_admin: { Args: never; Returns: boolean }
      es_staff: { Args: never; Returns: boolean }
      formatear_tiempo: { Args: { t: number }; Returns: string }
      tiene_acceso_panel: { Args: never; Returns: boolean }
    }
    Enums: {
      modulo_medio:
        | "noticias"
        | "eventos"
        | "patrocinadores"
        | "clubes"
        | "deportistas"
        | "documentos"
        | "resultados"
      rol_tipo: "admin" | "digitador"
      sexo_tipo: "F" | "M"
      tipo_medio: "imagen" | "documento"
      tipo_red_social:
        | "facebook"
        | "instagram"
        | "x"
        | "youtube"
        | "tiktok"
        | "whatsapp"
        | "linkedin"
        | "threads"
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
      modulo_medio: [
        "noticias",
        "eventos",
        "patrocinadores",
        "clubes",
        "deportistas",
        "documentos",
        "resultados",
      ],
      rol_tipo: ["admin", "digitador"],
      sexo_tipo: ["F", "M"],
      tipo_medio: ["imagen", "documento"],
      tipo_red_social: [
        "facebook",
        "instagram",
        "x",
        "youtube",
        "tiktok",
        "whatsapp",
        "linkedin",
        "threads",
      ],
    },
  },
} as const
