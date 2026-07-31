import type { ReactNode } from "react";
import { Navbar } from "@/features/navigation";
import { FooterSection } from "./footer";

export function PublicPageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><Navbar /><main className="pt-20">{children}</main><FooterSection /></div>;
}
