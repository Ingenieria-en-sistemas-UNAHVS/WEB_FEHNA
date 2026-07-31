"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MAIN_NAV } from "../config/routes";
import type { NavDropdown as NavDropdownItem } from "../types/navigation.types";
import { NavItemLink } from "./NavItemLink";

interface NavMobileProps {
  /** Cierra el panel tras navegar. */
  onNavigate: () => void;
}

const ITEM_CLASS =
  "block w-full text-left px-2 py-3 text-white/80 hover:text-accent transition-colors";

/** Panel de navegación desplegable (por debajo de lg). */
export function NavMobile({ onNavigate }: NavMobileProps) {
  return (
    <div className="lg:hidden bg-[#0a2040] border-t border-white/10 px-4 py-4">
      {MAIN_NAV.map((item) => (
        <div key={item.label} className="border-b border-white/5 last:border-0">
          {item.tipo === "dropdown" ? (
            <MobileDropdown item={item} onNavigate={onNavigate} />
          ) : (
            <NavItemLink item={item} className={ITEM_CLASS} onNavigate={onNavigate} />
          )}
        </div>
      ))}
    </div>
  );
}

/** Mismo submenú que en desktop, pero como acordeón. */
function MobileDropdown({
  item,
  onNavigate,
}: {
  item: NavDropdownItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`${ITEM_CLASS} flex items-center justify-between`}
      >
        {item.label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="pl-4 pb-2">
          {item.items.map((sub) => (
            <NavItemLink
              key={sub.label}
              item={sub}
              className={`${ITEM_CLASS} text-sm`}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </>
  );
}
