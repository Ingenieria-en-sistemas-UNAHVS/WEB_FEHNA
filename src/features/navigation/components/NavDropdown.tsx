"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavDropdown as NavDropdownItem } from "../types/navigation.types";
import { NavItemLink } from "./NavItemLink";

interface NavDropdownProps {
  item: NavDropdownItem;
}

/** Submenú del navbar en desktop. */
export function NavDropdown({ item }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cierre al hacer clic fuera o al presionar Escape.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 px-4 py-2 text-sm text-white/80 hover:text-accent transition-colors duration-200 tracking-wide"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 min-w-52 bg-[#0a2040] border border-white/10 rounded shadow-lg py-1">
          {item.items.map((sub) => (
            <NavItemLink
              key={sub.label}
              item={sub}
              className="block px-4 py-2.5 text-sm text-white/80 hover:text-accent hover:bg-white/5 transition-colors duration-200"
              onNavigate={() => setOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
