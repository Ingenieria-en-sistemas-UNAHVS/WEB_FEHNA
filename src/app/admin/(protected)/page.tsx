"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/features/admin/screens/Dashboard"), { ssr: false });

export default function AdminDashboardPage() {
  return <Dashboard />;
}
