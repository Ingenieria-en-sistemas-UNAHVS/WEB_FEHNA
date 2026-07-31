import {
  Trophy,
  Flag,
  Building2,
  ClipboardList,
  GraduationCap,
  Globe,
} from "lucide-react";
import type { ResponsibilityIcon } from "../types/about.types";

// Mapa de icono por clave, para que los datos no dependan de JSX.
export const RESPONSIBILITY_ICONS: Record<
  ResponsibilityIcon,
  typeof Trophy
> = {
  competencias: Trophy,
  seleccion: Flag,
  clubes: Building2,
  registro: ClipboardList,
  formacion: GraduationCap,
  representacion: Globe,
};
