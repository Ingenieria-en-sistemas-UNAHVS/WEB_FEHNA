"use client";

import dynamic from "next/dynamic";
import { RouterProvider } from "@/lib/router";
import { RequireAuth } from "@/auth/RequireAuth";

const AdminLayout = dynamic(() => import("@/admin/AdminLayout"), { ssr: false });

export default function AdminPage() {
  return (
    <RequireAuth>
      <RouterProvider>
        <AdminLayout />
      </RouterProvider>
    </RequireAuth>
  );
}
