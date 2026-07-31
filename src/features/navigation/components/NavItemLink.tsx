"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import type { NavLink } from "../types/navigation.types";

interface NavItemLinkProps {
  item: NavLink;
  className?: string;
  /** Se ejecuta tras navegar (lo usa el menú móvil para cerrarse). */
  onNavigate?: () => void;
}

/** Id de la sección si el href es un ancla de la home; si no, null. */
const anchorId = (href: string) => (href.startsWith("/#") ? href.slice(2) : null);

/** Enlace del navbar: resuelve rutas, anclas de la home y items "próximamente". */
export function NavItemLink({ item, className = "", onNavigate }: NavItemLinkProps) {
  const pathname = usePathname();

  if (item.proximamente) {
    return (
      <span className={`${className} opacity-40 cursor-default`} aria-disabled="true">
        {item.label}
      </span>
    );
  }

  const id = anchorId(item.href);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Estando ya en la home el ancla se resuelve con scroll suave, sin navegar.
    // Desde otra página el Link navega normal y el navegador salta al ancla.
    if (id && pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    onNavigate?.();
  };

  return (
    <Link href={item.href} className={className} onClick={handleClick}>
      {item.label}
    </Link>
  );
}
