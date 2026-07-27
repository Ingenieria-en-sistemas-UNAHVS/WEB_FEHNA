"use client";

import dynamic from "next/dynamic";

const EventosAdmin = dynamic(() => import("@/admin/modules/EventosAdmin"), { ssr: false });

export default function EventosPage() {
  return <EventosAdmin />;
}
