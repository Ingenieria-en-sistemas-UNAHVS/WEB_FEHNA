"use client";

import dynamic from "next/dynamic";
import { RequireAuth } from "@/auth/RequireAuth";

const AdminShell = dynamic(() => import("@/admin/AdminShell").then((mod) => ({ default: mod.AdminShell })), { ssr: false });

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <AdminShell>{children}</AdminShell>
    </RequireAuth>
  );
}
