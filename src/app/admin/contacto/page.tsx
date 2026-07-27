"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/auth/AuthProvider";

const ContactoAdmin = dynamic(() => import("@/admin/modules/ContactoAdmin"), { ssr: false });

export default function ContactoPage() {
  const { esAdmin } = useAuth();
  if (!esAdmin) return <SinPermiso />;
  return <ContactoAdmin />;
}

function SinPermiso() {
  return (
    <div className="text-center py-16 text-white/50 text-sm">
      Esta sección es solo para administradores.
    </div>
  );
}
