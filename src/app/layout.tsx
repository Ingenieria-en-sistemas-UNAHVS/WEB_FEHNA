import type { Metadata } from "next";
import { AuthProvider } from "@/auth/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Federación Hondureña de Natación",
  description:
    "Conecta con la comunidad de natación hondureña a través de una plataforma profesional con noticias, calendarios de competencias, perfiles de atletas y galerías multimedia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
