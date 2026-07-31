"use client";

import dynamic from "next/dynamic";

const AdminLogin = dynamic(() => import("@/features/auth/components/AdminLogin"), { ssr: false });

export default function AdminLoginPage() {
  return <AdminLogin />;
}
