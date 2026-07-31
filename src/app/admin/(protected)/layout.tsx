"use client";

import dynamic from "next/dynamic";
import { ProtectedRoute } from "@/features/auth";

const AdminShell = dynamic(() => import("@/features/admin/AdminShell").then((mod) => ({ default: mod.AdminShell })), { ssr: false });

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}
