// =====================================================================
// Mini-router (FEHNA) — enrutado ligero sin dependencias externas
// ---------------------------------------------------------------------
// Se usa un router propio y mínimo (History API) en lugar de
// react-router para evitar problemas de resolución del paquete en el
// entorno de Figma Make. Expone una API compatible en lo esencial:
// Link, useNavigate, useLocation y Navigate.
//
// Si en el futuro se restaura react-router (npm install), basta con
// cambiar los imports de "@/lib/router" por "react-router".
// =====================================================================
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

interface RouterCtx {
  path: string;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
}

const Ctx = createContext<RouterCtx | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to: string, opts?: { replace?: boolean }) => {
    if (to === window.location.pathname) return;
    if (opts?.replace) window.history.replaceState({}, "", to);
    else window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  return <Ctx.Provider value={{ path, navigate }}>{children}</Ctx.Provider>;
}

function useRouter(): RouterCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("El router debe usarse dentro de <RouterProvider>");
  return ctx;
}

export function useNavigate() {
  return useRouter().navigate;
}

export function useLocation() {
  const { path } = useRouter();
  return { pathname: path };
}

export function Link({
  to,
  children,
  ...rest
}: { to: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const navigate = useNavigate();
  return (
    <a
      href={to}
      onClick={(e) => {
        // Respeta clics con modificadores / nueva pestaña
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);
  return null;
}
