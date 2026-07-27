"use client";

import dynamic from "next/dynamic";
import { RouterProvider } from "@/lib/router";

const App = dynamic(() => import("@/app/App"), { ssr: false });

export default function Home() {
  return (
    <RouterProvider>
      <App />
    </RouterProvider>
  );
}
