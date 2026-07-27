"use client";

import { Star, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[#061529]">
        <img
          src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&h=900&fit=crop&auto=format"
          alt="Piscina olímpica de Honduras"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061529]/60 via-transparent to-[#061529]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061529] via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-30">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            style={{
              bottom: `${i * 8 + 4}px`,
              left: "-100%",
              right: "-100%",
              animation: `slideWave ${3 + i * 0.7}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideWave {
          0% { transform: translateX(-20%); }
          100% { transform: translateX(20%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.3s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.5s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.7s; opacity: 0; }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          <div className="fade-up fade-up-1 inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded px-3 py-1 text-accent text-xs tracking-widest uppercase mb-6">
            <Star size={10} fill="currentColor" />
            Federación Oficial · Miembro FINA · UANA
          </div>

          <h1 className="fade-up fade-up-2 text-6xl md:text-8xl font-black text-white leading-none mb-2 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
            Federación<br />
            <span className="text-accent">Hondureña</span><br />
            de Natación
          </h1>

          <p className="fade-up fade-up-3 text-lg text-white/70 mt-6 mb-10 leading-relaxed max-w-xl">
            El organismo rector de la natación, clavados, waterpolo y nado sincronizado en Honduras. Formamos campeones, construimos comunidad.
          </p>

          <div className="fade-up fade-up-4 flex flex-wrap gap-4">
            <button onClick={() => document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 px-7 py-4 bg-accent text-[#061529] font-black text-lg rounded hover:bg-white transition-all duration-200" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>
              AFÍLIATE <ArrowRight size={18} />
            </button>
            <button onClick={() => document.getElementById("atletas")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 px-7 py-4 border border-white/30 text-white font-semibold text-base rounded hover:border-accent hover:text-accent transition-all duration-200">
              Conoce a Nuestros Atletas
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { n: "380+", label: "Atletas Activos" },
              { n: "47", label: "Clubes Afiliados" },
              { n: "12", label: "Oros C.A. 2024" },
              { n: "3", label: "Olímpicos Paris 24" },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-accent/40 pl-4">
                <div className="text-3xl font-black text-accent" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{s.n}</div>
                <div className="text-xs text-white/50 mt-0.5 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max border-t border-white/10">
          {["Natación", "Clavados", "Waterpolo", "Nado Sincronizado"].map((d, i) => (
            <div key={d} className={`px-8 py-4 text-sm font-semibold tracking-wide cursor-default ${i === 0 ? "bg-accent text-[#061529]" : "bg-[#0a2040]/80 text-white/60 hover:text-white transition-colors"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em", fontSize: "13px" }}>
              {d.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
