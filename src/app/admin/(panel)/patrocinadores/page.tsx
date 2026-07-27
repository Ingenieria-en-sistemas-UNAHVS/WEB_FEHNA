"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/auth/AuthProvider";

const PatrocinadoresAdmin = dynamic(() => import("@/admin/modules/PatrocinadoresAdmin"), { ssr: false });

export default function PatrocinadoresPage() {
  const { esAdmin } = useAuth();
  if (!esAdmin) return <SinPermiso />;
  return <PatrocinadoresAdmin />;
}

function SinPermiso() {
  return (
    <div className="text-center py-16 text-white/50 text-sm">
      Esta sección es solo para administradores.
    </div>
  );
}
