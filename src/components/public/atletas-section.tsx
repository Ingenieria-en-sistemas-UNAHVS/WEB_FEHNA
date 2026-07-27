"use client";

import { useState } from "react";
import { ChevronRight, Trophy } from "lucide-react";
import type { DeportistaRow } from "@/lib/data/deportistas";
import { calcularEdad } from "@/lib/tiempo";

interface Props {
  deportistas: DeportistaRow[];
}

export function AtletasSection({ deportistas }: Props) {
  const [activeAthletes, setActiveAthletes] = useState(0);

  if (deportistas.length === 0) {
    return (
      <section id="atletas" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-accent text-xs tracking-widest uppercase mb-2">Orgullo Nacional</div>
            <h2 className="text-5xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Atletas de Élite</h2>
            <p className="text-muted-foreground text-base mt-3 max-w-lg mx-auto">Representan a Honduras en los más altos escenarios del deporte acuático mundial.</p>
          </div>
          <div className="text-center py-16 text-white/40 text-sm border border-dashed border-white/10 rounded-xl">
            Aún no hay deportistas registrados.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="atletas" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">Orgullo Nacional</div>
          <h2 className="text-5xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Atletas de Élite</h2>
          <p className="text-muted-foreground text-base mt-3 max-w-lg mx-auto">Representan a Honduras en los más altos escenarios del deporte acuático mundial.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deportistas.map((d, i) => (
            <div
              key={d.id}
              className={`group relative rounded-xl overflow-hidden bg-card border cursor-pointer transition-all duration-300 ${activeAthletes === i ? "border-accent shadow-lg shadow-accent/10" : "border-white/5 hover:border-accent/40"}`}
              onClick={() => setActiveAthletes(i)}
            >
              <div className="relative h-40 overflow-hidden bg-secondary flex items-center justify-center">
                <span className="text-6xl font-black text-white/10" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {`${d.nombres[0]}${d.apellidos[0]}`}
                </span>
                <div className="absolute top-3 left-3">
                  <span className="text-xs bg-accent text-[#061529] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                    {d.sexo === "F" ? "Femenino" : "Masculino"}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-white uppercase leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {d.nombres} {d.apellidos}
                </h3>
                <p className="text-muted-foreground text-sm mt-0.5">{d.clubes?.nombre ?? "Sin club"}</p>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-black text-accent" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{calcularEdad(d.fecha_nacimiento)}</div>
                    <div className="text-xs text-muted-foreground">Años</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-accent" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{d.tiempos?.[0]?.count ?? 0}</div>
                    <div className="text-xs text-muted-foreground">Marcas</div>
                  </div>
                  <div className="text-center">
                    <Trophy size={14} className="text-accent mx-auto mt-1" />
                    <div className="text-xs text-muted-foreground mt-0.5">FEHNA</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="flex items-center gap-2 mx-auto px-6 py-3 border border-white/20 text-white hover:border-accent hover:text-accent transition-all duration-200 rounded text-sm">
            Ver todos los atletas <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
