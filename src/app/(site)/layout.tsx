import type { ReactNode } from "react";
import { PublicPageShell } from "@/components/site/public-page-shell";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <PublicPageShell>{children}</PublicPageShell>;
}
