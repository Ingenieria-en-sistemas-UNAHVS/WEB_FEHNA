"use client";

import dynamic from "next/dynamic";

const DeportistasAdmin = dynamic(() => import("@/admin/modules/DeportistasAdmin"), { ssr: false });

export default function DeportistasPage() {
  return <DeportistasAdmin />;
}
