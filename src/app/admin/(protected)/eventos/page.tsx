"use client";

import dynamic from "next/dynamic";

const EventosAdmin = dynamic(() => import("@/features/admin/screens/EventosAdmin"), { ssr: false });

export default function EventosPage() {
  return <EventosAdmin />;
}
