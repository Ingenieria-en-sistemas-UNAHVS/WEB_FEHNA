import { AdminLink } from "@/components/shared/AdminLink";

export function FooterSection() {
  return (
    <footer className="bg-[#030d1a] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
                <img src="/favicon.png" alt="Logo FEHNA" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-white font-bold text-base leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>FEHNA</div>
                <div className="text-accent text-xs leading-none mt-0.5">Federación Hondureña de Natación</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Organismo rector de la natación, clavados, waterpolo y nado sincronizado en Honduras. Miembro oficial de FINA y la UANA.
            </p>
          </div>

          <div>
            <div className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Disciplinas</div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {["Natación", "Clavados", "Waterpolo", "Nado Sincronizado", "Aguas Abiertas"].map((d) => (
                <li key={d} className="hover:text-accent cursor-pointer transition-colors">{d}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Institución</div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {["Quiénes Somos", "Junta Directiva", "Reglamentos", "Resultados Oficiales", "Estatutos", "Transparencia"].map((l) => (
                <li key={l} className="hover:text-accent cursor-pointer transition-colors">{l}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2025 Federación Hondureña de Natación · Todos los derechos reservados
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground items-center">
            <span className="hover:text-accent cursor-pointer transition-colors">Política de Privacidad</span>
            <span className="hover:text-accent cursor-pointer transition-colors">Términos de Uso</span>
            <span className="hover:text-accent cursor-pointer transition-colors">Mapa del Sitio</span>
            <AdminLink />
          </div>
        </div>
      </div>
    </footer>
  );
}
