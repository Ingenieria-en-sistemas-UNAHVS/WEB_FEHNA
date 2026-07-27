"use client";

import { RouterProvider } from "@/lib/router";
import AdminLogin from "@/views/AdminLogin";

export default function LoginClient() {
  return (
    <RouterProvider>
      <AdminLogin />
    </RouterProvider>
  );
}
