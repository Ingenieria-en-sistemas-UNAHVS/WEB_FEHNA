"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavDesktop } from "./NavDesktop";
import { NavLogo } from "./NavLogo";
import { NavMobile } from "./NavMobile";

/** Barra de navegación del sitio público: solo estructura y estado del header. */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#061529]/95 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <NavLogo />
        <NavDesktop />

        <button
          className="lg:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && <NavMobile onNavigate={() => setMenuOpen(false)} />}
    </header>
  );
}
