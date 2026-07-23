import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { RouterProvider, useLocation } from "./lib/router.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { RequireAuth } from "./auth/RequireAuth.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminLayout from "./admin/AdminLayout.tsx";
import "./styles/index.css";

function Rutas() {
  const { pathname } = useLocation();

  if (pathname === "/admin/login") return <AdminLogin />;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    );
  }

  // Sitio público (cualquier otra ruta)
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider>
      <Rutas />
    </RouterProvider>
  </AuthProvider>
);
