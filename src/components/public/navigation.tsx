"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Noticias", href: "#noticias" },
  { label: "Calendario", href: "#calendario" },
  { label: "Atletas", href: "#atletas" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#061529]/95 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button onClick={() => scrollTo("inicio")} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
            <img src="/favicon.png" alt="Logo FEHNA" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-bold text-sm leading-none tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>FEHNA</div>
            <div className="text-accent text-xs leading-none mt-0.5 tracking-widest uppercase">Fed. Hondureña de Natación</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href.slice(1))}
              className="px-4 py-2 text-sm text-white/80 hover:text-accent transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => scrollTo("calendario")}
            className="px-4 py-2 text-sm border border-white/20 text-white hover:border-accent hover:text-accent transition-all duration-200 rounded"
          >
            Ver Calendario
          </button>
          <button
            onClick={() => scrollTo("registro")}
            className="px-5 py-2 text-sm bg-accent text-[#061529] font-bold hover:bg-white transition-all duration-200 rounded"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
          >
            AFÍLIATE
          </button>
        </div>

        <button className="lg:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0a2040] border-t border-white/10 px-4 py-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href.slice(1))}
              className="block w-full text-left px-2 py-3 text-white/80 hover:text-accent border-b border-white/5 last:border-0 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("registro")}
            className="mt-4 w-full py-3 bg-accent text-[#061529] font-bold rounded text-sm tracking-wider"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            AFÍLIATE AHORA
          </button>
        </div>
      )}
    </header>
  );
}
