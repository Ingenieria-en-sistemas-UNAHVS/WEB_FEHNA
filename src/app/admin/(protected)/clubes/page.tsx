"use client";

import dynamic from "next/dynamic";

const ClubesAdmin = dynamic(() => import("@/features/admin/screens/ClubesAdmin"), { ssr: false });

export default function ClubesPage() {
  return <ClubesAdmin />;
}
