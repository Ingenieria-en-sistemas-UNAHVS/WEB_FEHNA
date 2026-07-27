"use client";

import dynamic from "next/dynamic";

const AdminLogin = dynamic(() => import("@/views/AdminLogin"), { ssr: false });

export default function AdminLoginPage() {
  return <AdminLogin />;
}
