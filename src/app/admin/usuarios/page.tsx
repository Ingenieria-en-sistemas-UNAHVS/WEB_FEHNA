"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/auth/AuthProvider";

const UsuariosAdmin = dynamic(() => import("@/admin/modules/UsuariosAdmin"), { ssr: false });

export default function UsuariosPage() {
  const { esAdmin } = useAuth();
  if (!esAdmin) return <SinPermiso />;
  return <UsuariosAdmin />;
}

function SinPermiso() {
  return (
    <div className="text-center py-16 text-white/50 text-sm">
      Esta sección es solo para administradores.
    </div>
  );
}
