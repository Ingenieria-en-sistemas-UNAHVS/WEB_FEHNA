"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/features/auth";

const NoticiasAdmin = dynamic(() => import("@/features/admin/screens/NoticiasAdmin"), { ssr: false });

export default function NoticiasPage() {
  const { esAdmin } = useAuth();
  if (!esAdmin) return <SinPermiso />;
  return <NoticiasAdmin />;
}

function SinPermiso() {
  return (
    <div className="text-center py-16 text-white/50 text-sm">
      Esta sección es solo para administradores.
    </div>
  );
}
