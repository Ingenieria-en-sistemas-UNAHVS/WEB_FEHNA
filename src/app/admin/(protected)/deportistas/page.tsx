"use client";

import dynamic from "next/dynamic";

const DeportistasAdmin = dynamic(() => import("@/features/admin/screens/DeportistasAdmin"), { ssr: false });

export default function DeportistasPage() {
  return <DeportistasAdmin />;
}
