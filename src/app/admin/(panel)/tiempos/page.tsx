"use client";

import dynamic from "next/dynamic";

const TiemposAdmin = dynamic(() => import("@/admin/modules/TiemposAdmin"), { ssr: false });

export default function TiemposPage() {
  return <TiemposAdmin />;
}
