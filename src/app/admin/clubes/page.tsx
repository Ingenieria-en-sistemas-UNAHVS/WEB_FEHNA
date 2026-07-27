"use client";

import dynamic from "next/dynamic";

const ClubesAdmin = dynamic(() => import("@/admin/modules/ClubesAdmin"), { ssr: false });

export default function ClubesPage() {
  return <ClubesAdmin />;
}
