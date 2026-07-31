import Link from "next/link";
import { ROUTES } from "../config/routes";

/** Logo institucional del navbar; siempre lleva a la home. */
export function NavLogo() {
  return (
    <Link href={ROUTES.home} className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
        <img src="/favicon.png" alt="Logo FEHNA" className="w-full h-full object-cover" />
      </div>
      <div className="hidden sm:block">
        <div
          className="text-white font-bold text-sm leading-none tracking-wide"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          FEHNA
        </div>
        <div className="text-accent text-xs leading-none mt-0.5 tracking-widest uppercase">
          Fed. Hondureña de Natación
        </div>
      </div>
    </Link>
  );
}
