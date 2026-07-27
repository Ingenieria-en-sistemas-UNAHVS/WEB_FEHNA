"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/admin/modules/Dashboard"), { ssr: false });

export default function AdminDashboardPage() {
  return <Dashboard />;
}
