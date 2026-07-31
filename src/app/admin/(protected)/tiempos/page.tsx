"use client";

import dynamic from "next/dynamic";

const TiemposAdmin = dynamic(() => import("@/features/admin/screens/TiemposAdmin"), { ssr: false });

export default function TiemposPage() {
  return <TiemposAdmin />;
}
