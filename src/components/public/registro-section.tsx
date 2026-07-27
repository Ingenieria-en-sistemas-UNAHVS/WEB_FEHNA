"use client";

import { useState } from "react";
import { Trophy, Users, Star, Globe, ChevronDown } from "lucide-react";

export function RegistroSection() {
  const [formData, setFormData] = useState({ nombre: "", email: "", club: "", disciplina: "Natación", categoria: "Juvenil", mensaje: "" });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <section id="registro" className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #00C8E0, transparent)" }} />
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-accent text-xs tracking-widest uppercase mb-2">Únete a la familia acuática</div>
            <h2 className="text-5xl font-black text-white uppercase leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Regístrate<br /><span className="text-accent">como Nadador</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Afíliate a la FEHNA y accede a competencias oficiales, programas de desarrollo, entrenadores certificados y representación nacional.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Trophy, text: "Acceso a competencias nacionales e internacionales" },
                { icon: Users, text: "Red de 47 clubes afiliados en todo Honduras" },
                { icon: Star, text: "Programas de becas para atletas de alto rendimiento" },
                { icon: Globe, text: "Representación ante FINA, UANA y COH" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-accent" />
                  </div>
                  <p className="text-white/70 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-white/10 p-8">
            {formSent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={28} className="text-accent" fill="currentColor" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>¡Solicitud Enviada!</h3>
                <p className="text-muted-foreground text-sm mt-2">Nos pondremos en contacto contigo en las próximas 48 horas.</p>
                <button onClick={() => setFormSent(false)} className="mt-6 text-accent text-sm hover:text-white transition-colors">Enviar otra solicitud</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-black text-white uppercase mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Formulario de Afiliación</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Nombre completo *</label>
                    <input required type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20" placeholder="Tu nombre completo" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Correo electrónico *</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20" placeholder="correo@ejemplo.com" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Club o Asociación</label>
                    <input type="text" value={formData.club} onChange={(e) => setFormData({ ...formData, club: e.target.value })} className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/20" placeholder="Nombre del club" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Disciplina</label>
                    <div className="relative">
                      <select value={formData.disciplina} onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })} className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer">
                        <option>Natación</option>
                        <option>Clavados</option>
                        <option>Waterpolo</option>
                        <option>Sincronizado</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Categoría</label>
                    <div className="flex gap-2 flex-wrap">
                      {["Infantil", "Juvenil", "Junior", "Absoluta", "Masters"].map((c) => (
                        <button key={c} type="button" onClick={() => setFormData({ ...formData, categoria: c })} className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${formData.categoria === c ? "bg-accent text-[#061529]" : "border border-white/15 text-white/50 hover:text-white"}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Mensaje adicional</label>
                    <textarea value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} rows={3} className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-colors resize-none placeholder-white/20" placeholder="Cuéntanos sobre tu experiencia..." />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-accent text-[#061529] font-black text-lg rounded hover:bg-white transition-all duration-200 tracking-widest uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Enviar Solicitud
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
